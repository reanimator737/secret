import {expect} from 'chai'
import {ethers} from 'hardhat'
import {Pool, Secret20Shop, SecretToken} from '../typechain-types'
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/src/signers";
const tokenJSON = require("../artifacts/contracts/Token.sol/SecretToken.json")

describe("Pool", () => {
    let owner: SignerWithAddress;
    let buyer: SignerWithAddress;
    let shop: Secret20Shop;
    let erc20: SecretToken;
    let pool: Pool;

    beforeEach(async () =>  {
        //@ts-ignore TODO
        [owner, buyer] = await ethers.getSigners()

        const SecretShop = await ethers.getContractFactory("Secret20Shop", owner)
        shop = await SecretShop.deploy()
        await shop.deployed()

        erc20 = new ethers.Contract(await shop.token(), tokenJSON.abi, owner) as SecretToken

        const PoolFactory = await ethers.getContractFactory("Pool", owner)
        pool = await PoolFactory.deploy(await shop.token())
        await pool.deployed()

        const tx = await shop.connect(buyer).testTakeAll();
        await tx.wait();
    })

    it('Create new post', async () => {
        const VALUE = 10;
        const LIFE_TIME = 86400;
        const balanceBefore = await erc20.balanceOf(buyer.address);
        const approval = await erc20.connect(buyer).approve(pool.address, VALUE);
        await approval.wait();
        const tx = await pool.connect(buyer).createNewPost(VALUE, LIFE_TIME);
        await tx.wait();

        expect(tx).to.emit(pool, 'GenerateNewPost')
        expect(await erc20.balanceOf(buyer.address)).to.equal(balanceBefore.sub(VALUE))
        expect(await erc20.balanceOf(pool.address)).to.equal(VALUE)
    })

})