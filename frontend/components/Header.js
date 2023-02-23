import { ConnectButton } from "@web3uikit/web3"

function Header() {
    return (
        <div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default Header