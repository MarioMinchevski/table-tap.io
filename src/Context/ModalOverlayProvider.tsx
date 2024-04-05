import { useState } from "react"
import { ModalOverlayContext } from "./ModalOverlayContext"

type ModalOverlayProviderType = {
    children: React.ReactNode
}

export type ModalOverlayContextType = {
    isOverlayOpen: boolean

    isModalOpen: boolean
    isRemoveModalOpen: boolean
    isCheckoutModalOpen: boolean

    openModal: (id: string) => void
    closeModal: () => void

    openModalRemove: (id: string) => void
    closeModalRemove: () => void


    openModalCheckout: (id: string) => void
    closeModalCheckout: () => void
}

export function ModalOverlayProvider({ children }: ModalOverlayProviderType) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isRemoveModalOpen, setRemoveIsModalOpen] = useState(false)
    const [isCheckoutModalOpen, setCheckoutIsModalOpen] = useState(false)

    const [isOverlayOpen, setIsOverlayOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
        setIsOverlayOpen(true)
    }

    const openModalRemove = () => {
        setRemoveIsModalOpen(true)
        setIsOverlayOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsOverlayOpen(false)
    }

    const closeModalRemove = () => {
        setRemoveIsModalOpen(false)
        setIsOverlayOpen(false)
    }

    const openModalCheckout = () => {
        setCheckoutIsModalOpen(true)
        setIsOverlayOpen(true)
    }

    const closeModalCheckout = () => {
        setCheckoutIsModalOpen(false)
        setIsOverlayOpen(false)
    }

    return (
        <ModalOverlayContext.Provider
            value={{ isModalOpen, isOverlayOpen, openModal, closeModal, isRemoveModalOpen, openModalRemove, closeModalRemove, isCheckoutModalOpen, openModalCheckout, closeModalCheckout }}>
            {children}
        </ModalOverlayContext.Provider>
    )
}