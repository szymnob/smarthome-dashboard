import ModalWindow from "@/components/ui/assets/modals/ModalWindow";
import SubmitButton, {CancelButton} from "@/components/ui/assets/Buttons";
import * as PropTypes from "prop-types";

export default function DeleteConfirmation({isVisible, onClose, onDelete, name}) {


    return(
        <ModalWindow isVisible={isVisible} onClose={onClose} title={"Delete " + name + "?"}>
            <div className="m-5 space-y-5" >
                <p>Are you sure you want to delete {name}?</p>
                <div className="flex flex-row justify-between space-x-5 p-2">
                    <CancelButton onClick={onClose}/>
                    <SubmitButton label="Delete" onClick={()=>{onDelete(); onClose();}}/>
                </div>
            </div>
        </ModalWindow>
    )
}

DeleteConfirmation.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}