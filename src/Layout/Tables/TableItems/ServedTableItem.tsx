import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useModalOverlayContext } from "../../../Context/ModalOverlayContext"
import { useSelectedTableContext } from "../../../Context/SelectedTableContext"
import { TableType } from "../../InfoSection/types"
import { toCheckout } from "../../Modals/utils/toCheckout"

export function ServedTableItem({ id, orders }: TableType) {
    const queryClient = useQueryClient()

    const sentToCheckoutMutation = useMutation({
        mutationFn: toCheckout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
        },
    })

    const { openModal, openModalRemove } = useModalOverlayContext()
    const { selectTable } = useSelectedTableContext()

    const handleAddDrinkClick = () => {
        selectTable(id)
        openModal(id)
    }

    const handleRemoveDrinkClick = () => {
        selectTable(id)
        openModalRemove(id)
    }

    const handleConfirm = async () => {
        try {
            await sentToCheckoutMutation.mutateAsync({ selectedTableId: id })
        } catch (err) {
            console.log("Error adding drink:", err)
        }
        selectTable(null)
    }


    return (
        <div className="table-item served">
            <div className="table-item__text">
                <h3>Table <span>{id}</span></h3>
                <div className="table-orders">
                    <p>Ordered drinks:</p>
                    <ul>
                        {orders?.map((item, idx) => {
                            return (
                                <li key={`${item.name} - ${idx}`}>
                                    <span>{item.name}</span>
                                    <span>{item.price}$</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="buttons">
                <button className="remove-drink-btn" onClick={handleRemoveDrinkClick}>Remove drink</button>
                <button className="add-drink-btn" onClick={handleAddDrinkClick}>Add drink</button>
            </div>
            <button className="to-checkout-btn" onClick={handleConfirm}>To checkout</button>
        </div>
    )
}
