import { Gateway, GatewayTransaction } from "@renproject/ren";
import { useCallback, useState } from "react";
import { CreateGateway } from "./CreateGateway";
import { GatewayTx } from "./GatewayTx";
import { ShowGateway } from "./ShowGateway";

function App() {
    const [gatewayTxs, setGatewayTxs] = useState<GatewayTransaction[]>([]);
    const addGatewayTx = useCallback(
        (tx: GatewayTransaction) => {
            setGatewayTxs((txs) => [...txs, tx]);
        },
        [setGatewayTxs]
    );

    const [gateway, setGateway] = useState<Gateway>();
    const onGateway = useCallback(
        (newGateway: Gateway) => {
            newGateway.on("transaction", addGatewayTx);
            setGateway(newGateway);
        },
        [addGatewayTx]
    );

    return (
        <div className="App" style={{ padding: 10 }}>
            <h3>Gateway</h3>
            {gateway ? (
                <ShowGateway gateway={gateway} />
            ) : (
                <CreateGateway onGateway={onGateway} />
            )}

            <h3>Gateway Transactions</h3>
            <div
                style={{
                    display: "flex",
                    flexFlow: "column",
                }}
            >
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
