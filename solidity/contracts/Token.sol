// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import '../interface/IERC20.sol';

contract ERC20 is IERC20 {
    uint totalTokens;
    address owner;
    mapping(address => uint ) balances;
    mapping(address => mapping(address => uint)) allowances;
    string _name;
    string _symbol;

    function name() external view returns(string memory){
        return _name;
    }

    function symbol()  external view returns(string memory){
        return _symbol;
    }

    function decimals()  external pure returns(uint){
        return 18; // 1 token = 1 wei
    }

    function totalSupply() external view returns(uint)  {
        return totalTokens;
    }



    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    modifier enoughTokens(address _from, uint _amount){
        require(balanceOf(_from) >= _amount, "not enough tokens");
        _;
    }

    constructor(string memory name_, string memory symbol_, uint initialSupply, address shop) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
        mint(initialSupply, shop);
    }

    function balanceOf(address account) public view returns(uint)  {
        return balances[account];
    }

    function mint(uint amount, address shop) public onlyOwner {
        balances[shop] += amount;
        totalTokens += amount;
        emit Transfer(address(0), shop, amount);
    }

    function transfer(address to, uint amount)  external enoughTokens(msg.sender, amount){
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function allowance(address _owner, address spender)  public view returns(uint){
        return allowances[_owner][spender];
    }

    function approve(address spender, uint amount)  public{
        allowances[msg.sender][spender] = amount;
        emit Approve(msg.sender, spender, amount);
    }

    function transferFrom(address sender,address recipient ,uint amount)  external enoughTokens(sender, amount){
        allowances[sender][recipient] -= amount;
        balances[sender] -=amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function burn(address _from, uint amount) public onlyOwner enoughTokens(_from, amount){
        balances[_from] -= amount;
        totalTokens -= amount;
    }
}


contract SecretToken is ERC20 {
    constructor(address shop) ERC20("SecretToken", "Secret", 1000, shop){}
}
