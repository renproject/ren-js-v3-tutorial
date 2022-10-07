import { AsyncButton } from "async-button";
import { ethers } from "ethers";
import { useCallback, useState } from "react";

import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS, { Gateway } from "@renproject/ren";

import { ChainTx } from "./ChainTx";

// REPLACE WITH YOUR CONTRACT ADDRESS FROM PART 1:
const contractAddress = "0x2e8084cd0d6a3d7923504c3d68E849Ba7f032C6b";

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
