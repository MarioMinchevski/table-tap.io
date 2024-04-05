import { Header } from "../Layout/Header/Header";
import { InfoSection } from "../Layout/InfoSection/InfoSection";
import { AddDrinkModal } from "../Layout/Modals/AddDrinkModal";
import { CheckoutModal } from "../Layout/Modals/CheckoutModal";
import { Overlay } from "../Layout/Modals/Overlay";
import { RemoveDrinkModal } from "../Layout/Modals/RemoveDrinkModal";
import { Tables } from "../Layout/Tables/Tables";

export function Homepage() {
    return (
        <div className="homepage">
            <Overlay />
            <AddDrinkModal />
            <RemoveDrinkModal />
            <CheckoutModal />

            <InfoSection />
            <div className="homepage-wrap">
                <Header />
                <Tables />
            </div>
        </div>
    )
}