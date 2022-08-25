const { network } = require("hardhat");
const { developmentChains, decimals, initialAnswer } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...");
        await deploy("MockV3Aggregator", { // the object section is to specify some parameters in the deployment of the mock. The most important are the two ars (decimals and initialAnswer) which are required by the constructor of the contract present in the MockV3Aggregator.sol file in the node_modules/chainlink/v6/...
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args:[decimals,initialAnswer],
        });
        log("Mocks deployed!");
        log("-------------------------------------------------");
    }
}

module.exports.tags = ["all", "mocks"];
