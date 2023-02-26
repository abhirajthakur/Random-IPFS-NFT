import { ConnectButton } from "@web3uikit/web3";
import Link from "next/link";

function Header() {
  return (
    <div className="flex flex-row justify-between items-center border-b-2 p-4">
      <Link
        href="https://goerli.etherscan.io/address/0x31849D0F5Ac736cA4386245A42eD54F694dBc379#code"
        target="_blank"
      >
        <h1 className="p-4 font-normal text-3xl">Random IPFS NFT</h1>
      </Link>
      <div>
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}

export default Header;
