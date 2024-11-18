

import ModalWindow from "@/components/control-overlays/ModalWindow";


export default function AddNewFloor({isVisible, onClose}) {

    const modalTitle = "Add new floor";

    if (!isVisible) {
        return null;
    }
    console.log("dupa")
    return (
        <>
        <ModalWindow isVisible={isVisible} onClose={onClose} title={modalTitle}>
            <h1>USUSUFUDUFSFU</h1>
        </ModalWindow>
        </>
    )
}