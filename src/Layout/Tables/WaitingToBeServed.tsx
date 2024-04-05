import { useQuery } from "@tanstack/react-query"
import { TableType } from "../InfoSection/types"
import { fetchTableStatuses } from "../InfoSection/utils/fetchTables"
import { WaitingTableItem } from "./TableItems/WaitingTableItem"


export function WaitingToBeServed() {
    const { data, isLoading, error } = useQuery<TableType[]>({
        queryFn: () => fetchTableStatuses(),
        queryKey: ['tables']
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>
    }

    const waitingTables = data?.filter(table => table.status === 'waiting')

    return (
        <div className="tables-wrap">
            <h2>Waiting to be served</h2>
            {waitingTables && waitingTables.map(table => (
                <WaitingTableItem key={table.id} {...table} />
            ))}
        </div>
    )
}