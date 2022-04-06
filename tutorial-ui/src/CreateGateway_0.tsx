import { AsyncButton } from "async-button";
import { ethers } from "ethers";
import { useCallback, useState } from "react";

import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS, { Gateway } from "@renproject/ren";

import { ChainTx } from "./ChainTx";

// REPLACE WITH YOUR CONTRACT ADDRESS FROM PART 1:
const contractAddress = "0x18ebE494aB4eA0331740ef394d61eA83f8b9e272";

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
