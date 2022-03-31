import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS, { Gateway } from "@renproject/ren";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { AsyncButton } from "async-button";
import { ChainTx } from "./ChainTx";

// Define `ethereum` type provided by MetaMask and other web3 browser wallets.
declare global {
    interface Window {
        ethereum: any;
    }
}

interface Props {
    gateway: Gateway | undefined;
    onGateway: (gateway: Gateway) => void;
}

export const CreateGateway = ({ gateway, onGateway }: Props) => {
    const [ethereum] = useState(
        () =>
            new Ethereum({
                network: "testnet",
                provider: new ethers.providers.JsonRpcProvider(
                    Ethereum.configMap.testnet?.network.rpcUrls[0]
                ),
            })
    );
    const [bitcoin] = useState(() => new Bitcoin({ network: "testnet" }));
    const [renJS] = useState(() =>
        new RenJS("testnet").withChains(ethereum, bitcoin)
    );

    const createGateway = useCallback(async () => {
        // Connect to MetaMask.
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        ethereum.withSigner(web3Provider.getSigner());
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== parseInt(ethereum.network.network.chainId)) {
            throw new Error(
                `Wrong network - please change to ${ethereum.network.network.chainName}`
            );
        }

        // Create gateway.
        const gateway = await renJS.gateway({
            asset: "BTC",
            from: bitcoin.GatewayAddress(),
            to: ethereum.Account(),
        });

        onGateway(gateway);
    }, [bitcoin, ethereum, renJS, onGateway]);

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
            <p>Asset: BTC</p>
            <p>From: Bitcoin</p>
            <p>To: Ethereum</p>
            {/* Button to create gateway. */}
            <AsyncButton onClick={createGateway}>Create</AsyncButton>
        </div>
    );
};
