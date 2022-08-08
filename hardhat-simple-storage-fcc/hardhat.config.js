require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");

/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;


// Every time we run a script, the hardhat network is deleted so we cannot interact with it afterwards.
// If we run "yarn hardhat node", hardhat will create a similar node to Ganache (not in the Hardhat network) that we can interact afterwards.
// To use this type of node, we need to declare it in the "module.exports" section with localhost (for example)"
// The url is given in the console when the command is executed, the accounts don't need to be present and the chainId is the same as Hardhat
// Much quicker than working in an official testnet
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      // accounts: Hardhat already placed them,
      chainId: 31337,
    }
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};

// yarn add --dev dotenv