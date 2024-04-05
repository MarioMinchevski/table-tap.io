import { useQuery } from "@tanstack/react-query"
import { TableType } from "../InfoSection/types"
import { fetchTableStatuses } from "../InfoSection/utils/fetchTables"
import { ServedTableItem } from "./TableItems/ServedTableItem"


export function Served() {
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

    const servedTables = tables?.filter(item => item.status === 'served')
    return (
        <div className="tables-wrap">
            <h2>Served</h2>
            {servedTables && servedTables.map(table => (
                <ServedTableItem key={table.id} {...table} />
            ))}
        </div>
    )
}