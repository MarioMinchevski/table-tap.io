import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useModalOverlayContext } from "../../Context/ModalOverlayContext"
import { useSelectedTableContext } from "../../Context/SelectedTableContext"
import { TableType } from "../InfoSection/types"
import { fetchTableStatuses } from "../InfoSection/utils/fetchTables"
import { confirmPay } from "./utils/confrimPay"

export function CheckoutModal() {
    const queryClient = useQueryClient()

    const { data: tables } = useQuery<TableType[]>({
        queryFn: fetchTableStatuses,
        queryKey: ['tables']
    })

    const { selectedTableId, selectTable } = useSelectedTableContext()
    const { isCheckoutModalOpen, closeModalCheckout } = useModalOverlayContext()

    const selectedTable = tables?.find(table => table.id === selectedTableId)
    // const isTableSelected = selectedTable && selectedTable.orders


    const handleCloseModal = () => {
        closeModalCheckout()
        selectTable(null)
    }

    const ordersSum = selectedTable?.orders?.reduce((total, order) => total + order.price, 0)

    const confirmPayMutation = useMutation({
        mutationFn: confirmPay,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
            handleCloseModal()
        }
    })

    const handlePayTab = () => {
        confirmPayMutation.mutate(selectedTableId)
    }

    return (
        isCheckoutModalOpen ? (
            <div className="checkout-modal">
                <h3>Tab for Table {selectedTableId}</h3>
                <h4>Orders</h4>
                <ul className="checkout-order-list">
                    {selectedTable?.orders?.map((order, idx) => (
                        <li key={idx}>
                            <span>{order.name}</span>
                            <span>{order.price}$</span>
                        </li>
                    ))}
                </ul>
                <p className="checkout-total">Total sum: <span>{ordersSum}$</span></p>
                <div className="checkout-button-wrap">
                    <button className="cancel-checkout" onClick={handleCloseModal}>Cancel</button>
                    <button className="pay-checkout" onClick={handlePayTab}>Pay tab</button>
                </div>
            </div>
        ) : null
    )
}