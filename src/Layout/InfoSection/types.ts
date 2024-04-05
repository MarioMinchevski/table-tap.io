import { DrinkType } from "../Modals/types"

export type TableType = {
    id: string,
    name: string,
    status: string
    orders?: DrinkType[]
}