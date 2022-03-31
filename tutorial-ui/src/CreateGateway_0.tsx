import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS, { Gateway } from "@renproject/ren";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { AsyncButton } from "async-button";

declare global {
    interface Window {
        ethereum: any;
    }
}

interface Props {
    onGateway: (gateway: Gateway) => void;
}

export const CreateGateway = ({ onGateway }: Props) => {
    // Define createGateway here...
    const createGateway = () => {};

    return (
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
