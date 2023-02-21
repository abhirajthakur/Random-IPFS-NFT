const { ethers } = require("hardhat");

const networkConfig = {
    31337: {
        name: "localhost",
        keyHash: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 150 gwei keyhash
        callbackGasLimit: "500000", // 500,000 gas
        mintFee: ethers.utils.parseEther("0.01"),
    },
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        keyHash: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 150 gwei Key Hash
        callbackGasLimit: "500000", // 500,000 gas
        mintFee: ethers.utils.parseEther("0.01"),
        subscriptionId: "10023",
    }
}

const DECIMALS = "18";
const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
}