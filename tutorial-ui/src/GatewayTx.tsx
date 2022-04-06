import { useState } from "react";

import { GatewayTransaction } from "@renproject/ren";
import { ChainTransactionStatus } from "@renproject/utils";

import { ChainTx } from "./ChainTx";

interface Props {
    gatewayTx: GatewayTransaction;
}

export const GatewayTx = ({ gatewayTx }: Props) => {
    const [inProgress, setInProgress] = useState(gatewayTx.in.progress);
    const [renVMProgress, setRenVMProgress] = useState(
        gatewayTx.renVM.progress
    );

    return (
        <div>
            <p>
                Moving {gatewayTx.params.asset} from {gatewayTx.in.chain} to{" "}
                {gatewayTx.out.chain}
            </p>

            <p>
                {gatewayTx.in.chain} tx:{" "}
                <ChainTx chainTx={gatewayTx.in} onProgress={setInProgress} />
            </p>
            <p>
                {gatewayTx.renVM.chain} tx:{" "}
                <ChainTx
                    chainTx={gatewayTx.renVM}
                    autoSubmit={true}
                    disabled={inProgress.status !== ChainTransactionStatus.Done}
                    onProgress={setRenVMProgress}
                />
            </p>
            <p>
                {gatewayTx.out.chain} tx:{" "}
                <ChainTx
                    chainTx={gatewayTx.out}
                    disabled={
                        renVMProgress.status !== ChainTransactionStatus.Done
                    }
                />
            </p>
        </div>
    );
};
