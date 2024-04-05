import { useState } from "react";
import { selectedTableContext } from "./SelectedTableContext";

type SelectedTableProviderType = {
    children: React.ReactNode
}

export type SelectedTableContextType = {
    selectedTableId: string | null
    selectTable: (id: string | null) => void
}

export function SelectedTableProvider({ children }: SelectedTableProviderType) {
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null)

    const selectTable = (id: string | null) => {
        setSelectedTableId(id)
    }

    return (
        <selectedTableContext.Provider value={{ selectedTableId, selectTable }}>
            {children}
        </selectedTableContext.Provider>
    )
}