import { TableType } from '../types'

function generateTwoDigitRandom() {
    return Math.floor(Math.random() * 30) + 1
}

export async function addTable(): Promise<TableType> {
    const response = await fetch('http://localhost:3001/tables')
    if (!response.ok) {
        throw new Error('Failed to fetch tables')
    }
    const tables: TableType[] = await response.json()

    let id = generateTwoDigitRandom()

    while (tables.some(table => table.id === id.toString())) {
        id = generateTwoDigitRandom()
    }

    const newTable: TableType = {
        id: id.toString(),
        name: `Table ${id}`,
        status: "waiting",
    }

    ///

    const postResponse = await fetch('http://localhost:3001/tables', {
        method: 'POST',
        body: JSON.stringify(newTable),
    })

    if (!postResponse.ok) {
        throw new Error('Failed to add table')
    }

    return newTable
}
