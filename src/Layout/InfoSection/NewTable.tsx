import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTable } from "./utils/addTable";
import { TableType } from "./types";

export function NewTable() {
    const queryClient = useQueryClient()

    const createTableMutation = useMutation<TableType>({
        mutationFn: addTable,
        onSuccess: () => {
            // console.log(data)
            queryClient.invalidateQueries({ queryKey: ["tables"] });
        },
    })

    const handleAddTable = async () => {
        try {
            await createTableMutation.mutateAsync()
        } catch (err) {
            console.log("Error adding table:", err)
        }
    }

    return (
        <button className="new-table" onClick={handleAddTable}>Assign table</button>
    );
}
