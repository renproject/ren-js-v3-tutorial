import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS, { Gateway, GatewayTransaction } from "@renproject/ren";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { CreateGateway } from "./CreateGateway";
import { GatewayTx } from "./GatewayTx";

function App() {
    const [ethereum] = useState(
        () =>
            new Ethereum({
                network: "testnet",
                provider: new ethers.providers.JsonRpcProvider(
                    Ethereum.configMap.testnet?.network.rpcUrls[0]
                ),
            })
    );
    const [bitcoin] = useState(() => new Bitcoin({ network: "testnet" }));
    const [renJS] = useState(() =>
        new RenJS("testnet").withChains(ethereum, bitcoin)
    );

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
            <CreateGateway
                renJS={renJS}
                gateway={gateway}
                onGateway={onGateway}
            />

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
