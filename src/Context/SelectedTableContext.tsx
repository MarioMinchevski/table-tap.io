import { createContext, useContext } from "react";
import { SelectedTableContextType } from "./SelectedTableProvider";

export const selectedTableContext = createContext({} as SelectedTableContextType)

export const useSelectedTableContext = () => useContext(selectedTableContext)