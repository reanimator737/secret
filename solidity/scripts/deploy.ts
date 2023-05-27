import { ethers } from "hardhat";

async function main() {
  const SecretShop = await ethers.getContractFactory("Secret20Shop");
  const secretShop = await SecretShop.deploy();

  await secretShop.deployed();

  const tokenAddress = await secretShop.token();


  console.log(
    `Shop deployed to ${secretShop.address}`
  );

  console.log(
    `Token address ${tokenAddress}`
  );

  const Pool = await ethers.getContractFactory("Pool");
  const pool = await Pool.deploy(tokenAddress);

  await pool.deployed();

  console.log(
    `Pool deployed to ${pool.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
