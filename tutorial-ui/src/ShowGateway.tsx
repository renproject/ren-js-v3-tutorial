import { Gateway } from "@renproject/ren";
import { ChainTx } from "./ChainTx";

interface Props {
    gateway: Gateway;
}

export const ShowGateway = ({ gateway }: Props) => {
    return (
        <div>
            {gateway.gatewayAddress ? (
                <p>
                    Deposit {gateway.params.asset} to {gateway.gatewayAddress}.
                </p>
            ) : null}

            {gateway.in ? <ChainTx chainTx={gateway.in} /> : null}
        </div>
    );
};
