// async function deployFunc(hre) {
//     console.log("test!");
// }

const { networkConfig } = require("../helper-hardhat-config");
const { network } = require("hardhat");

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
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]


    // when going for localhost or hardhat network --> use a mock
    // Mocking is creating objects that simulate the behavior of real objects. Why do we want to use this? Mostly for unit testing.
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [address], // put price feed address
        log: true,

    })
}
