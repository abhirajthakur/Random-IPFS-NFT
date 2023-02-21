const { ethers, network, run } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper.hardhat.config");
const { verify } = require("../utils/verify");
const fs = require("fs");
require("dotenv").config();

async function main() {
    const chainId = network.config.chainId;
    let vrfCoordinatorV2Address, subscriptionId;

    if (developmentChains.includes(network.name)) {
        const BASE_FEE = "250000000000000000";
        const GAS_PRICE_LINK = 1e9;
        const FUND_AMOUNT = ethers.utils.parseUnits("10", 22);

        // Deploying VRCCoordinatorV2Mock contract for local testing
        console.log("Local network detected, Deploying mocks....");
        const VrfCoordinatorV2Mock = await ethers.getContractFactory("VRFCoordinatorV2Mock");
        const vrfCoordinatorV2Mock = await VrfCoordinatorV2Mock.deploy(BASE_FEE, GAS_PRICE_LINK);
        console.log(`VRFCoordinatorV2Mock deployed at address: ${vrfCoordinatorV2Mock.address}`);

        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
        const tx = await vrfCoordinatorV2Mock.createSubscription();
        const txReceipt = await tx.wait(1);
        subscriptionId = txReceipt.events[0].args.subId;
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);

        console.log("\n---------------------------------------------\n");
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
        subscriptionId = networkConfig[chainId].subscriptionId;
    }


    const tokenUris = [
        "ipfs://QmW7mRn66jPEnvq1EsMMQvyss613qEDudSvMXw1SG76y38",
        "ipfs://QmP5rk6RJNbxumu8DonQCfBRW9meg4cxAKvbhtVxQ4FvVK",
        "ipfs://QmTNrTsqi1m3GZqefJE3eUbEnceryYLtZ8mQQXsFVJw7nZ",
    ];
    const args = [
        vrfCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId].keyHash,
        networkConfig[chainId].callbackGasLimit,
        tokenUris,
        networkConfig[chainId].mintFee
    ]

    const waitConfirmations = developmentChains.includes(network.name) ? 1 : 6;

    const RandomIpfsNft = await ethers.getContractFactory("RandomIpfsNFT");
    const randomIpfsNFT = await RandomIpfsNft.deploy(...args);
    await randomIpfsNFT.deployTransaction.wait(waitConfirmations);
    console.log(`RandomIpfsNFT deployed to ${randomIpfsNFT.address}`);

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(randomIpfsNFT.address, args);

        const textToappend = `RandomIpfsNFT address: ${randomIpfsNFT.address}\n`;
        fs.appendFileSync("./address.txt", textToappend);
    }
};

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })