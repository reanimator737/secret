// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '../interface/IERC20.sol';
import "./Token.sol";

contract Pool {
    IERC20 token;
    uint totalPosts;
    event GenerateNewPost(uint indexed _id, address indexed _owner, uint value, bytes32 secret);

    struct Post{
        uint value;
        bool isActive;
        uint createdAt;
        uint lifeTime;
        bytes32 secret;
    }

    struct UserActivity {
        uint likes;
        bool hasOwnerLike;
        address user;
    }

    mapping(address => mapping(uint => Post)) usersPosts;
    mapping(address => uint[]) usersPostIdArray;


    constructor(address _tokenAddress){
        token = SecretToken(_tokenAddress);
    }

    function createNewPost(uint _value, uint _lifeTime, bytes32 _secret) external{
        require(_lifeTime >= 6 hours, "Post must exist for at least 6 hours");
        require(_lifeTime <= 7 days, "Post must be closed no later than 7 days");
        require(_value > 0, "Incorrect value");
        require(token.balanceOf(msg.sender) >= _value, "Not enough tokens");
        uint allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _value, "Check allowance");
        token.transferFrom(msg.sender, address(this), _value);
        totalPosts += 1;
        usersPosts[msg.sender][totalPosts] = Post(_value, false, block.timestamp, _lifeTime + block.timestamp, _secret);
        usersPostIdArray[msg.sender].push(totalPosts);
        emit GenerateNewPost(totalPosts, msg.sender, _value, _secret);
    }


    function withdraw(uint _totalLikes, uint _totalOwnerLikes, UserActivity[] memory _userActivity, address _owner, uint _postId ) external{
        Post memory _post = usersPosts[_owner][_postId];
        require(_post.isActive, 'Already withdrawn');
        require(_post.createdAt - block.timestamp < _post.lifeTime, 'Too little time has passed');
        uint ownerLikeGives = _totalLikes / 2 > 5 ? _totalLikes / 2 : 5;
        uint total = _totalLikes + ownerLikeGives * _totalOwnerLikes;
        usersPosts[_owner][_postId].isActive = true;

        for(uint i; i < _userActivity.length; i++){
            uint value = _userActivity[i].likes + (_userActivity[i].hasOwnerLike ? ownerLikeGives : 0);
            token.transferFrom(_userActivity[i].user, address(this), value/total);
        }
    }
}
