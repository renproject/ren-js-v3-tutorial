import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS, { Gateway } from "@renproject/ren";
import { ethers } from "ethers";
import { useCallback } from "react";
import { AsyncButton } from "async-button";
import { ChainTx } from "./ChainTx";

const connectWeb3Wallet = async (chain: Ethereum) => {
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    const web3Provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    chain.withSigner(web3Provider.getSigner());
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== parseInt(chain.network.network.chainId)) {
        throw new Error(
            `Wrong network - please change to ${chain.network.network.chainName}`
        );
    }
};

interface Props {
    renJS: RenJS;
    gateway: Gateway | undefined;
    onGateway: (gateway: Gateway) => void;
}

export const CreateGateway = ({ renJS, gateway, onGateway }: Props) => {
    // Gateway parameters.
    const asset = "BTC";
    const from: Bitcoin = renJS.chains.Bitcoin as Bitcoin;
    const to: Ethereum = renJS.chains.Ethereum as Ethereum;

    const createGateway = useCallback(async () => {
        // Connect Web3 wallet.
        await connectWeb3Wallet(to);

        // Create gateway.
        const gateway = await renJS.gateway({
            asset: "BTC",
            from: from.GatewayAddress(),
            to: to.Account(),
        });

        onGateway(gateway);
    }, [from, to, renJS, onGateway]);

    return gateway ? (
        <div>
            {gateway.gatewayAddress ? (
                <p>
                    Deposit {gateway.params.asset} to {gateway.gatewayAddress}.
                </p>
            ) : null}

            {gateway.in ? <ChainTx chainTx={gateway.in} /> : null}
        </div>
    ) : (
        <div>
            {/* Show gateway parameters. */}
            <p>Asset: {asset}</p>
            <p>From: {from.chain}</p>
            <p>To: {to.chain}</p>
            {/* Button to create gateway. */}
            <AsyncButton onClick={createGateway}>Create</AsyncButton>
        </div>
    );
};
