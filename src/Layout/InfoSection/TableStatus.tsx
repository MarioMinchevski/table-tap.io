import { useQuery } from '@tanstack/react-query';
import { fetchTableStatuses } from './utils/fetchTables';
import { TableType } from './types';

export function TableStatus() {

    const { data: tables, isLoading, error, refetch } = useQuery<TableType[]>({
        queryFn: fetchTableStatuses,
        queryKey: ['tables']
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>
    }

    const waitingCount = tables?.filter(table => table.status === 'waiting').length
    const servedCount = tables?.filter(table => table.status === 'served').length
    const payingCount = tables?.filter(table => table.status === 'paying').length

    return (
        <div className="table-status">
            {/* <button onClick=()=> refetch())></button> */}
            <h3>Table status:</h3>
            <div className="table-status-info">
                <div className="circle waiting"></div>
                <p>Waiting to be served: <span className="to-be-served">{waitingCount}</span></p>
            </div>
            <div className="table-status-info">
                <div className="circle served"></div>
                <p>Served: <span className="served">{servedCount}</span></p>
            </div>
            <div className="table-status-info">
                <div className="circle to-pay"></div>
                <p>Ready to pay: <span className="ready-to-pay">{payingCount}</span></p>
            </div>
        </div >
    );
}

