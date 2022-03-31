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
    // Gateway creation code here...

    return gateway ? (
        <div>{/* Show gateway... */}</div>
    ) : (
        <div>{/* Show create gateway button... */}</div>
    );
};
