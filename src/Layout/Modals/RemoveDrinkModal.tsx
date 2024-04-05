import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useModalOverlayContext } from "../../Context/ModalOverlayContext"
import { useSelectedTableContext } from "../../Context/SelectedTableContext"
import { TableType } from "../InfoSection/types"
import { fetchTableStatuses } from "../InfoSection/utils/fetchTables"
import { removeDrink } from "./utils/removeDrink"

export function RemoveDrinkModal() {
    const queryClient = useQueryClient()

    const { data: tables } = useQuery<TableType[]>({
        queryFn: fetchTableStatuses,
        queryKey: ['tables']
    })

    const removeDrinkMutatiton = useMutation({
        mutationFn: removeDrink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
        },
    })

    const { isRemoveModalOpen, closeModalRemove } = useModalOverlayContext()
    const { selectedTableId } = useSelectedTableContext()


    const selectedTable = tables?.find(table => table.id === selectedTableId)
    const isTableSelected = selectedTable && selectedTable.orders

    const handleCloseModal = () => {
        closeModalRemove()
    }

    const handleConfirm = async (orderIndex: number) => {
        if (selectedTableId) {
            try {
                await removeDrinkMutatiton.mutateAsync({ tableId: selectedTableId, orderIndex })
            } catch (err) {
                console.log("Error removing drink:", err)
            }
        } else {
            console.log("No table selected.")
        }
    }


    return (
        isRemoveModalOpen ? (
            <div className="remove-drink-modal">
                <h3>Click on the drink you want to remove:</h3>
                <ul className="remove-drink-list">
                    {isTableSelected && selectedTable.orders!.map((order, idx) => (
                        <li key={idx}>
                            <span>{order.name}</span>
                            <span>{order.price}$</span>
                            <button className="delete"
                                onClick={() => handleConfirm(idx)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="close-btn" onClick={handleCloseModal}>Close</button>
            </div>
        ) : null
    )
}