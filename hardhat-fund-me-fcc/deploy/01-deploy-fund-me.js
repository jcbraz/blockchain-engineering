// async function deployFunc(hre) {
//     console.log("test!");
// }

const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

// same syntax but here the function is anonymous
// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre;
//     // hre.getNamedAccounts()
//     // hre.deployments
// }

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts(); 
    const chainId = network.config.chainId;

    // if chainId is X use address Y
    // if chainId is Z use address A
    // how do we do it ?
    // github.com/aave/aave-v3-core/blob/master/helper-hardhat-config.ts --> network config
    let ethUsdPriceFeedAddress, flag = 0;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
        flag = 1;
    }


    // if the contract does not exist, we deploy a minimal version of our local testing (mocks comes into place)
    // deploying mocks is technically a deploy scripts so it needs to be created in a different file and has to run before this fund-me test to make the verification if the price feeds for our applying case does or does not exist.

    // when going for localhost or hardhat network --> use a mock
    // Mocking is creating objects that simulate the behavior of real objects. Why do we want to use this? Mostly for unit testing.
    const fundMe = await deploy("FundMe", {
        from: deployer,
        // args: [address], // put price feed address
        args: [ethUsdPriceFeedAddress],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1, // after defining the block confirmations wait for each network in the hardhat config file, this declaration comes into place (if there are no block confirmations defined, we go if one.) 

    })
    log("--------------------------------------");

    if (flag.valueOf === 1 && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress]);
    }
}

module.exports.tags = ["all", "fund-me"];