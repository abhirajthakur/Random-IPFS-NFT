import { useEffect, useState } from "react";
import { abi, randomIpfsNFTAddress } from "@/constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { Button, useNotification, Loading } from "@web3uikit/core";

function NftMinting() {
  const { isWeb3Enabled, account } = useMoralis();
  const [mintFee, setMintFee] = useState(0);
  const dispatch = useNotification();

  const { runContractFunction: getMintFeeFromContract } = useWeb3Contract({
    abi: abi,
    contractAddress: randomIpfsNFTAddress,
    functionName: "getMintFee",
  });

  const {
    runContractFunction: mintNFT,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: randomIpfsNFTAddress,
    functionName: "requestNft",
    msgValue: mintFee,
  });

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

  const updateMintFee = async () => {
    const _mintFee = await getMintFeeFromContract();
    setMintFee(_mintFee);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateMintFee();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="p-5 text-3xl">
      {account ? (
        <div>
          <div className="flex justify-center p-3">
            Mint Fee: {ethers.formatEther(mintFee.toString())} ETH
          </div>
          <div className="flex justify-center p-3">
            {isLoading || isFetching ? (
              <Loading size={55} spinnerColor="white" />
            ) : (
              <Button
                onClick={async () => {
                  await mintNFT({
                    onSuccess: handleSuccess,
                    onError: (err) => console.error("Error", err),
                  });
                }}
                size="large"
                style={{
                  font: "inherit",
                  color: "white",
                  background:
                    "linear-gradient(to bottom right, #4ADEDE, #1F2198)",
                }}
                text="Mint NFT"
                theme="custom"
                disabled={isLoading || isFetching}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-3xl">
          Please connect your wallet
        </div>
      )}
    </div>
  );
}

export default NftMinting;
