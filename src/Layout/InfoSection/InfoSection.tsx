import { Logo } from "../Header/Logo";
import { GeneralInfo } from "./GeneralInfo";
import { NewTable } from "./NewTable";
import { TableStatus } from "./TableStatus";

export function InfoSection() {
    return (
        <aside className="info-section">
            <Logo />
            <GeneralInfo />
            <TableStatus />
            <NewTable />
        </aside>
    )
}