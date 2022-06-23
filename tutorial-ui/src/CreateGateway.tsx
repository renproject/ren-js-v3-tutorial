import { AsyncButton } from "async-button";
import { ethers } from "ethers";
import { useCallback } from "react";

import { Bitcoin, Ethereum } from "@renproject/chains";
import { EVMParam } from "@renproject/chains-ethereum/build/main/utils/payloads/evmParams";
import RenJS, { Gateway } from "@renproject/ren";

import { ChainTx } from "./ChainTx";

// REPLACE WITH YOUR CONTRACT ADDRESS FROM PART 1:
const contractAddress = "0xcfbD9476BbcEAdebFd6964f4D447853309480DF2";

const connectWeb3Wallet = async (chain: Ethereum) => {
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    const web3Provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    chain.withSigner(web3Provider.getSigner());
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== parseInt(chain.network.config.chainId)) {
        throw new Error(
            `Wrong network - please change to ${chain.network.config.chainName}`
        );
    }
};

interface Props {
    renJS: RenJS;
    gateway: Gateway | undefined;
    onGateway: (gateway: Gateway) => void;
}

export const CreateGateway = ({ renJS, gateway, onGateway }: Props) => {
    const createDepositGateway = useCallback(async () => {
        // Gateway parameters.
        const asset = "BTC";
        const from = renJS.getChain<Bitcoin>("Bitcoin");
        const to = renJS.getChain<Ethereum>("Ethereum");

        // Connect Web3 wallet.
        await connectWeb3Wallet(to);

        // Create gateway.
        const gateway = await renJS.gateway({
            asset: asset,
            from: from.GatewayAddress(),
            to: to.Contract({
                to: contractAddress,
                method: "deposit",
                withRenParams: true,
                params: [
                    {
                        name: "symbol",
                        type: "string",
                        value: asset,
                    },
                    {
                        name: "message",
                        type: "string",
                        value: "Hello world.",
                    },
                ],
            }),
        });

        onGateway(gateway);
    }, [renJS, onGateway]);

    const createWithdrawGateway = useCallback(async () => {
        // Gateway parameters.
        const asset = "BTC";
        const from = renJS.getChain<Ethereum>("Ethereum");
        const to = renJS.getChain<Bitcoin>("Bitcoin");

        const recipient = await prompt(`Enter ${to.chain} address:`);
        if (!recipient) {
            throw new Error(`Must provide a recipient.`);
        }

        // Connect Web3 wallet.
        await connectWeb3Wallet(from);

        const contractBalance = await from.getBalance(asset, contractAddress);

        // Create gateway.
        const gateway = await renJS.gateway({
            asset: asset,
            from: from.Contract({
                to: contractAddress,
                method: "withdraw",
                withRenParams: false,
                params: [
                    {
                        name: "symbol",
                        type: "string",
                        value: asset,
                    },
                    {
                        name: "message",
                        type: "string",
                        value: "Hello world.",
                    },
                    {
                        name: "to",
                        type: "string",
                        // Fetch address from `to` field instead of
                        // re-specifying `recipient`.
                        value: EVMParam.EVM_TO_ADDRESS,
                    },
                    {
                        name: "amount",
                        type: "uint256",
                        value: contractBalance.toFixed(),
                    },
                ],
            }),
            to: to.Address(recipient),
        });

        onGateway(gateway);
    }, [renJS, onGateway]);

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
            <AsyncButton onClick={createDepositGateway}>Deposit</AsyncButton>{" "}
            <AsyncButton onClick={createWithdrawGateway}>Withdraw</AsyncButton>
        </div>
    );
};
