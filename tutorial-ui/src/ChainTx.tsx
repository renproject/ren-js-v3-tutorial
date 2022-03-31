import {
    TxWaiter,
    TxSubmitter,
    ChainTransactionStatus,
    ChainTransactionProgress,
} from "@renproject/utils";
import { useEffect, useState } from "react";
import { AsyncButton } from "async-button";

interface Props {
    // The chain transaction
    chainTx: TxWaiter | TxSubmitter;
    // Whether the transaction should be submitted automatically or with a button click
    autoSubmit?: boolean;
    // Disable the button - if the transaction isn't ready
    disabled?: boolean;
    // Callback for when the transaction emits a progress event
    onProgress?: (progress: ChainTransactionProgress) => void;
}

export const ChainTx = ({
    chainTx,
    autoSubmit,
    disabled,
    onProgress,
}: Props) => {
    // Store latest transaction progress.
    const [progress, setProgress] = useState(chainTx.progress);

    useEffect(() => {
        // When a new progress event is available, update the state and
        // propogate the event upwards.
        const progressHandler = (progress: ChainTransactionProgress) => {
            setProgress(progress);
            if (onProgress) {
                onProgress(progress);
            }
        };
        chainTx.eventEmitter.on("progress", progressHandler);
        progressHandler(chainTx.progress);

        // Remove the listener when this ChainTx component is unmounted.
        return () => {
            chainTx.eventEmitter.removeListener("progress", progressHandler);
        };
    }, [chainTx, setProgress, onProgress]);

    return (
        <>
            {/* "ready" */}
            {progress.status === ChainTransactionStatus.Ready ? (
                <AsyncButton
                    onClick={chainTx.submit!.bind(chainTx)}
                    allowOnlyOnce={true}
                    // Pass through ChainTx props
                    callOnMount={autoSubmit}
                    disabled={disabled}
                >
                    Submit {chainTx.chain} transaction
                </AsyncButton>
            ) : null}

            {/* confirming */}
            {progress.status === ChainTransactionStatus.Confirming ? (
                <AsyncButton
                    onClick={chainTx.wait.bind(chainTx)}
                    allowOnlyOnce={true}
                    callOnMount={true}
                    disabled={disabled}
                >
                    {progress.confirmations === undefined
                        ? "..."
                        : progress.confirmations}{" "}
                    / {progress.target} confirmations
                </AsyncButton>
            ) : null}

            {/* done */}
            {progress.status === ChainTransactionStatus.Done ? (
                <span>
                    {progress.transaction?.txidFormatted.slice(0, 20)}...
                </span>
            ) : null}

            {/* reverted */}
            {progress.status === ChainTransactionStatus.Reverted ? (
                <span>Reverted: {progress.revertReason}</span>
            ) : null}
        </>
    );
};
