import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS, { Gateway } from "@renproject/ren";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { AsyncButton } from "async-button";
import { ChainTx } from "./ChainTx";

// REPLACE WITH YOUR CONTRACT ADDRESS FROM PART 1:
const contractAddress = "0x280fF67BACa8d121B7Ee9c52871FBF1D82EE8aD9";

interface Props {
    renJS: RenJS;
    gateway: Gateway | undefined;
    onGateway: (gateway: Gateway) => void;
}

export const CreateGateway = ({ renJS, gateway, onGateway }: Props) => {
    // Gateway creation code here...

    return gateway ? (
        <div>{/* Show gateway... */}</div>
    ) : (
        <div>{/* Show deposit and withdraw buttons... */}</div>
    );
};
