import ModalWindow from "@/components/ui/assets/modals/ModalWindow";
import Input from "@/components/ui/assets/Input";
import SubmitButton, {CancelButton} from "@/components/ui/assets/Buttons";
import * as PropTypes from "prop-types";
import {useState} from "react";

export default function ChangeName({isVisible, onClose, name, setName}) {

    const[newName, setNewName] = useState(name);
    const[errorName, setErrorName] = useState("");

    if (!isVisible) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateName(newName)){
            setName(newName);
            onClose();
        }
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
        if(errorName){
            validateName(e.target.value);
        }
    }

    const validateName = (name) => {
        if(name.length < 8){
            setErrorName("Name too short");
            return false;
        }else{
            setErrorName("");
            setName(name);
            return true;
        }
    }

    return (
        <ModalWindow isVisible={isVisible} onClose={onClose} title="Change name">
            <div className="m-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <p>Change name for: {name}</p>
                    <Input id="newName" label="New name:" type="text" error={errorName} value={newName} onChange={handleNameChange}/>

                    {(errorName) && <div
                        className="w-full text-center bg-red-400 shadow-md shadow-red-300 rounded-lg leading-loose">{errorName}</div>}

                    <div className="flex flex-row justify-between space-x-5 p-2">
                        <CancelButton onClick={onClose}/>
                        <SubmitButton label="Change"/>
                    </div>
                </form>

            </div>
        </ModalWindow>
    )
}

ChangeName.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired
}