type RemoveDrinkType = {
    tableId: string
    orderIndex: number
}

export async function removeDrink({ tableId, orderIndex }: RemoveDrinkType): Promise<void> {
    const response = await fetch(`http://localhost:3001/tables/${tableId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch table')
    }
    const table = await response.json()

    const updatedOrders = table.orders.filter((_: any, index: number) => index !== orderIndex)

    const updatedStatus = updatedOrders.length === 0 ? "waiting" : table.status

    const orderBody = {
        ...table,
        orders: updatedOrders,
        status: updatedStatus
    }


    const updateResponse = await fetch(`http://localhost:3001/tables/${tableId}`, {
        method: 'PATCH',
        body: JSON.stringify(orderBody),
    });

    if (!updateResponse.ok) {
        throw new Error('Failed to remove drink from table');
    }
}
