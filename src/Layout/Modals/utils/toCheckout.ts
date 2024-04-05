type toCheckoutType = {
    selectedTableId: string | null
}

export async function toCheckout({ selectedTableId }: toCheckoutType): Promise<void> {

    const response = await fetch(`http://localhost:3001/tables/${selectedTableId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch table')
    }
    const table = await response.json()

    table.status = 'paying'


    const requestBody = {
        status: table.status
    }

    const updateResponse = await fetch(`http://localhost:3001/tables/${selectedTableId}`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
    })

    if (!updateResponse.ok) {
        throw new Error('Failed to add drink to table')
    }
}
