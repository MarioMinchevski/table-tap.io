import { DrinkType } from "../types";

type addDrinkType = {
    selectedTableId: string | null,
    selectedDrink: DrinkType | null
}

export async function addDrink({ selectedTableId, selectedDrink }: addDrinkType): Promise<void> {

    const response = await fetch(`http://localhost:3001/tables/${selectedTableId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch table')
    }
    const table = await response.json()

    if (!table.orders) {
        table.orders = []
    }

    table.orders.push(selectedDrink)

    table.status = TableStatuses.Served

    const requestBody = {
        ...table,
        orders: table.orders,
        status: table.status
    }

    const updateResponse = await fetch(`http://localhost:3001/tables/${selectedTableId}`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
    })

    if (!updateResponse.ok) {
        throw new Error('Failed to add drink to table');
    }
}

export const enum TableStatuses {
    Served = 'served',
    Waiting = 'waiting',
    Paying = 'paying'

}
