import { useEffect, useState } from "react";
import { abi, randomIpfsNFTAddress } from "@/constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { Button } from "@web3uikit/core";
import { useNotification } from "@web3uikit/core";

function NftMinting() {
  const { isWeb3Enabled, account } = useMoralis();
  const [mintFee, setMintFee] = useState(0);
  const dispatch = useNotification();

  const { runContractFunction: getMintFeeFromContract } = useWeb3Contract({
    abi: abi,
    contractAddress: randomIpfsNFTAddress,
    functionName: "getMintFee",
  });

  const { runContractFunction: mintNFT } = useWeb3Contract({
    abi: abi,
    contractAddress: randomIpfsNFTAddress,
    functionName: "requestNft",
    msgValue: mintFee,
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const _mintFee = await getMintFeeFromContract();
        setMintFee(_mintFee);
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
  };

  const handleNewNotification = () => {
    dispatch({
      type: "success",
      message: "Successfully minted the NFT!",
      title: "Transaction Notification",
      position: "topL",
    });
  };

  return (
    <div>
      {account ? (
        <div>
          Mint Fee: {ethers.formatEther(mintFee.toString())} ETH
          <Button
            loadingText="Minting the NFT"
            color="blue"
            onClick={async () => {
              await mintNFT({
                onSuccess: handleSuccess,
                onError: (err) => console.error("Error", err),
              });
            }}
            size="large"
            text="Mint NFT"
            theme="outline"
          />
        </div>
      ) : (
        <div>Please Connect your wallet</div>
      )}
    </div>
  );
}

export default NftMinting;
