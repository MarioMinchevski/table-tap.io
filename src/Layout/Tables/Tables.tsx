import { ReadyToPay } from "./ReadyToPay";
import { Served } from "./Served";
import { WaitingToBeServed } from "./WaitingToBeServed";

export function Tables() {
    return (
        <>
            <main className="tables">
                <WaitingToBeServed />
                <Served />
                <ReadyToPay />
            </main>
        </>
    )
}