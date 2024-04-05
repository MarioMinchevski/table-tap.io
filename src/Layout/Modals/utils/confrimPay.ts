export async function confirmPay(tableId: string | null): Promise<void> {
    const response = await fetch(`http://localhost:3001/tables/${tableId}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Failed to delete table')
    }
}
