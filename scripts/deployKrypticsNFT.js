// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
  const KrypticsNFT = await hre.ethers.getContractFactory("KrypticsNFT");
  const krypticsNFT = await KrypticsNFT.deploy();

  await krypticsNFT.deployed();

  console.log(`KrypticsNFT deployed to ${krypticsNFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// contract address: 0x304A581DE90BD0E570325C8561b7AcABf60f9418