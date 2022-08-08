// If we write  "yarn hardhat" on the console, a number of tasks will show up. In this file we will create our own custom tasks.
// docs: https://hardhat.org/guides/create-task.html

// This file will be used to create a task to get the block-number of the transaction we are working in.

const { task } = require("hardhat/config");

task("block-number","Prints the current block number").setAction(
    // const blockTask = async function() => {}
    // async function blockTask() {}
    // same syntax but in the first one we do not give a name to the function

    // hre === Hardhat RunTime Environment === require("hardhat")
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number: ${blockNumber}`);
    }
);


module.exports = {}
// For the task to show up on the console menu, we need to require it in the hardhat.config file
// Tasks are used normally for specific cases like plugins. In general, using scripts can be better for developing in a local environment