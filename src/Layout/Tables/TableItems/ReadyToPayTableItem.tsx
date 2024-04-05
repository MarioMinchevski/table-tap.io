import { useModalOverlayContext } from "../../../Context/ModalOverlayContext";
import { useSelectedTableContext } from "../../../Context/SelectedTableContext";
import { TableType } from "../../InfoSection/types";

export function ReadyToPayTableItem({ id, orders }: TableType) {
    const { selectTable } = useSelectedTableContext()
    const { openModalCheckout } = useModalOverlayContext()

    const handleCloseBill = () => {
        selectTable(id)
        openModalCheckout(id)
    }
    const ordersSum = orders?.reduce((total, order) => total + order.price, 0)

    return (
        <div className="table-item ready-to-pay">
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
                            );
                        })}
                    </ul>
                </div>
                <p className="total-amount">Total amount: <span>{ordersSum}$</span></p>
            </div>
            <div className="buttons">
                <button className="pay-btn" onClick={handleCloseBill}>Close Bill</button>
            </div>
        </div>
    )

}
