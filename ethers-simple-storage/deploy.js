// Solidity === Synchronous --> runs one line after other (except Oracles)
// Asynchronous === Javascript --> multi-tasking
// Promise === Javascript -> Some actions can be dependent. For that, they return a Promise:
// A Promise can be:
// Pending
// Fulfilled
// Rejected
// With this type of coding, actions can be told to wait for Promises or just continue executing with they are supposed to do.

// async keyword -> declares asyncronous code
// await keyword -> waits for Promises (Promise based)

// Example:

// Setup Movie Night

// Cook popcorn
// Pour Drinks
// Start Movie --> only starts when both before are finished

// Code example:

const ethers = require("ethers"); // call ethers.js --> typescript (import ...)
const fs = require("fs-extra"); // import library fs to read from the SmartContract files
require("dotenv").config(); // better way to import the wallet address

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); // Way the script connects to the blockchain
  // const wallet = new ethers.Wallet(
  //   process.env.PRIVATE_KEY,
  //   provider
  // );  Way to connect to Ganache Wallet --> !! Do not paste real private keys this way.
  const encryptedJson = fs.readFileSync("./.encryptedKey.json");
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider);

  // To compile without having the password on the ".env" file,
    // PRIVATE_KEY_PASSWORD=... node deploy.js

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); // Read the abi from the contract
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  ); // Read the binary from the contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); // Reproduce the contract with ethers giving the abi,binary and wallet for fees (Ganache).
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); // deploy the contract --> await keyword means it has to way for the abi and binary to be completed (synchronous property). If there was not the await keyword, the Promise would be pending.
  // const contractWithGas = await ethers.ContractFactory({ gasLimit: 100 }); --> example of override
  // const transactionReceipt = await contract.deployTransaction.wait(1); // wait 1 block validation (.wait(1))
  // console.log("Here is the deployment transaction: \n");
  // console.log(contract.deployTransaction);
  // console.log("Here is the transaction receipt: \n");
  // console.log(transactionReceipt);
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);



  //   console.log("Let's deploy with only transaction data!");
  //   const nounce = await wallet.getTransactionCount();
  //   const tx = {
  //     // nounce: 3, number associated with specific transaction --> 3 because Ganache had 1 and 2 used
  //     nounce: nounce,
  //     gasPrice: 20000000,
  //     gasLimit: 10000,
  //     to: null,
  //     value: 0,
  //     data: "0x608060405234801561001057600080fd5b506101e1806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063471f7cdf1461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100f2565b60405180910390f35b610073600480360381019061006e91906100b6565b61007b565b005b60005481565b8060008190555060008081548092919061009490610117565b9190505560008190555050565b6000813590506100b081610194565b92915050565b6000602082840312156100cc576100cb61018f565b5b60006100da848285016100a1565b91505092915050565b6100ec8161010d565b82525050565b600060208201905061010760008301846100e3565b92915050565b6000819050919050565b60006101228261010d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561015557610154610160565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b61019d8161010d565b81146101a857600080fd5b5056fea2646970667358221220ba0c01a0ddbb5762fba0b05c3873da6f957e33395ed0e46f5bcb9d0c8fabef9764736f6c63430008070033", // 0x + data in binary file
  //     chainId: 1337, // Ganache ID
  //   };
  //   const sentTxResponse = await wallet.sendTransaction(tx);
  //   console.log(sentTxResponse);



  const currentFavoriteNumber = await contract.retrieve(); // after generating a deployable contract and executing it, we can use the methods in the contract directly.
  console.log(currentFavoriteNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// NOTES:

// Compile manually: yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol --> there is a script: yarn compile


// Ganache  --> fake blockchain


// RPC --> Remote Procedure Call
// URL --> Uniform Resource Locator
// RPC + URL == Connection to a Blockchain


// Transaction Receipt (created when there is block confirmation wait (.wait)) != Deployment Receipt (Transaction Response --> created when the transaction is generated)


// An alternative way to the ".env" file is to run the command directly on the command line:
// RPC_URL=... PRIVATE_KEY=... node deploy.js


// Alchemy app --> test on the real test-net


// !! Documentation:
// https://docs.ethers.io/v5/
// https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5
// https://faucets.chain.link/rinkeby