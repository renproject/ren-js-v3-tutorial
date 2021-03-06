import { AsyncButton } from "async-button";
import { useEffect, useState } from "react";

import {
    ChainTransactionProgress,
    ChainTransactionStatus,
    TxSubmitter,
    TxWaiter,
} from "@renproject/utils";

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
    // Handle Chain Transaction here...
};
