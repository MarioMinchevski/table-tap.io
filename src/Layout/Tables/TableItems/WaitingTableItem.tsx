import { useModalOverlayContext } from "../../../Context/ModalOverlayContext"
import { useSelectedTableContext } from "../../../Context/SelectedTableContext"
import { TableType } from "../../InfoSection/types"

export function WaitingTableItem({ id }: TableType) {
    const { openModal } = useModalOverlayContext()
    const { selectTable } = useSelectedTableContext()

    const handleAddDrinkClick = () => {
        selectTable(id)
        openModal(id)
    }

    return (
        <div className="table-item waiting">
            <div className="table-item__text">
                <h3>Table <span>{id}</span></h3>
                <p>Please attend this table!</p>
            </div>
            <div className="buttons">
                <button className="add-drink-btn" onClick={handleAddDrinkClick}>Add drink</button>
            </div>
        </div>
    )
}