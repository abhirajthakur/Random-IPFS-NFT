import Head from "next/head";
import Header from "@/components/Header";
import NftMinting from "@/components/NftMinting";

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT</title>
        <meta name="description" content="Random IPFS NFT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen justify-between bg-gradient-to-br from-[#141e30] to-[#4568dc] text-white">
        <Header />
        <NftMinting />
      </div>
    </>
  );
}
