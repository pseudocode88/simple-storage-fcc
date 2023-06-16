// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const hreVerify = require("@nomicfoundation/hardhat-verify");


async function main() {
  const SimpleStorage = await hre.ethers.deployContract("SimpleStorage");
  await SimpleStorage.waitForDeployment();

  console.log("Deployed Contract to: " + SimpleStorage.target)
  
  if (hre.network.chainId === 5) {
    await SimpleStorage.deployTransaction.wait(6);
    await verify(SimpleStorage.target, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying Contract ...")

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log("Already Verified!")
    } else {
      console.log(e);
    }
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
