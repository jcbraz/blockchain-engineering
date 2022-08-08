// imports
const { ethers, run, network } = require("hardhat"); // run allows to run any hardhat command task via code

// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  // private key?
  // rpc url?
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) { // 4 --> Rinkeby
    await simpleStorage.deployTransaction.wait(6); // why do we wait 6 blocks for the transaction? Due to Ethereum & Etherscan pace, it might take some time for the transaction to come throw the network. So, for good practice, we should wait some time before doing the verification.
    await verify(simpleStorage.address,[]);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

// function to auto-verify --> for this, we will use the hardhat-etherscan plugin
// add plugin: yarn add --dev @nomiclabs/hardhat-etherscan 
async function verify(contractAddress, args) {
  console.log("Verifying contract!");
  try {
    await run("verify:verify",{
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!");
      } else {
        console.log(e);
      }
  } // we do this try-catch because etherscan can smart enough to verify the contract itself due to the possibility of a similar contract being implemented. If that happens, an error is thrown and we want to be aware of that.
}
  
// main
main().then(() => process.exit(0))
      .catch((error) => {
        console.error(error)
        process.exit(1)
      })

// NOTES:
// no need for private key/ rpc & url --> hardhat has a mechanism of Ganache to generate a fake environment so it can be executed by default (Hardhat Network --> local Ethereum node)
// Compile with network specification: yarn hardhat run scripts/deploy.js --network hardhat
// chainlist.org --> check chain id number
// https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan --> hardhat etherscan plugin documentation
// In JS:
      // 4 == 4 -> true
      // 4 == "4" -> true
      // 4 === "4" -> false