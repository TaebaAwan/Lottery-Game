const hre = require("hardhat");
async function main() {

    // We get the contract to deploy
    const lottery = await hre.ethers.getContractFactory("Lottery");
    console.log("Deploying Contract . . . . ");
    const Lottery = await lottery.deploy("1000000000000000000", "120"); 
  
    await Lottery.deployed();
    console.log(
        Lottery.address 
  );
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  // Deployed & Verified on BNB:
  // https://testnet.bscscan.com/address/0x5737E34794Cd98d6e18Df80AfE341a5De6aCF63E#code
