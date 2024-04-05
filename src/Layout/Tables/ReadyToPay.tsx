import { useQuery } from "@tanstack/react-query"
import { TableType } from "../InfoSection/types"
import { fetchTableStatuses } from "../InfoSection/utils/fetchTables"
import { ReadyToPayTableItem } from "./TableItems/ReadyToPayTableItem"

export function ReadyToPay() {
    const { data: tables, isLoading, error } = useQuery<TableType[]>({
        queryFn: fetchTableStatuses,
        queryKey: ['tables']
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>
    }

    const readyToPayTables = tables?.filter(table => table.status === 'paying')

    return (
        <div className="tables-wrap">
            <h2>Ready to pay</h2>
            {readyToPayTables &&
                readyToPayTables.map((table, idx) =>
                    <ReadyToPayTableItem key={`${table.name}-${idx}`} {...table} />
                )}
        </div>
    )
}