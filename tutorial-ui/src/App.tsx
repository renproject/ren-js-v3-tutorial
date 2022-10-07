import { useCallback, useState } from "react";

import { Bitcoin, Goerli } from "@renproject/chains";
import RenJS, { Gateway, GatewayTransaction } from "@renproject/ren";
import { RenNetwork } from "@renproject/utils";

import { CreateGateway } from "./CreateGateway";
import { GatewayTx } from "./GatewayTx";

function App() {
    // Initialize RenJS and chains.
    const network = RenNetwork.Testnet;
    const [ethereum] = useState(
        () =>
            new Goerli({ // Use Ethereum on mainnet
                network,
                // Use public provider URL
                provider: Goerli.configMap[network]!.config.rpcUrls[0],
            })
    );
    const [bitcoin] = useState(() => new Bitcoin({ network }));
    const [renJS] = useState(() =>
        new RenJS(network).withChains(ethereum, bitcoin)
    );

    // Store gateway transactions.
    const [gatewayTxs, setGatewayTxs] = useState<GatewayTransaction[]>([]);
    const addGatewayTx = useCallback(
        (tx: GatewayTransaction) => {
            setGatewayTxs((txs) => [...txs, tx]);
        },
        [setGatewayTxs]
    );

    // Create callback for a new gateway.
    const [gateway, setGateway] = useState<Gateway>();
    const onGateway = useCallback(
        (newGateway: Gateway) => {
            newGateway.on("transaction", addGatewayTx);
            setGateway(newGateway);
        },
        [addGatewayTx]
    );

    return (
        <div className="App" style={{ padding: "0 10px" }}>
            <h3>Gateway</h3>
            <CreateGateway
                renJS={renJS}
                gateway={gateway}
                onGateway={onGateway}
            />

            <h3>Gateway Transactions</h3>
            <div>
                {gatewayTxs.map((gatewayTx) => (
                    <div
                        key={gatewayTx.hash}
                        style={{
                            padding: 10,
                            margin: "10px 0",
                            border: "1px solid black",
                        }}
                    >
                        <GatewayTx gatewayTx={gatewayTx} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
