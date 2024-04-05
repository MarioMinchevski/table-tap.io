import { useModalOverlayContext } from "../../Context/ModalOverlayContext";

export function Overlay() {
    const { isOverlayOpen } = useModalOverlayContext()

    return isOverlayOpen ? <div className="overlay"></div> : null
}