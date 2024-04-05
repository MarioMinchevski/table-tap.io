import { createContext, useContext } from "react";
import { ModalOverlayContextType } from "./ModalOverlayProvider";

export const ModalOverlayContext = createContext({} as ModalOverlayContextType)

export const useModalOverlayContext = () => useContext(ModalOverlayContext)