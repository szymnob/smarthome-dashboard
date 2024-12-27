
import ModalWindow from "@/components/ui/assets/ModalWindow";
import {useContext, useEffect, useState} from "react";
import dataContext from "@/app/dashboard/data/dataContext";
import {addFloor, getFloorsNumbers, getRoomsIdOnFloor} from "@/app/dashboard/data/dataService";
import DataContext from "@/app/dashboard/data/dataContext";
import Input from "@/components/ui/assets/Input";
import SubmitButton, {CancelButton} from "@/components/ui/assets/Buttons";

export default function AddNewFloor({isVisible, onClose}) {
    const modalTitle = "Add new floor";

    const { data } = useContext(DataContext);
    const {setData} = useContext(DataContext);

    const[existingFloors, setExistingFloors] = useState([]);

    useEffect(() => {
        if (data) {
            setExistingFloors(getFloorsNumbers(data));
        }
    }, [data]);

    const[floorNumber, setFloorNumber] = useState('');
    const[floorName, setFloorName] = useState('');

    const[errorNumber, setErrorNumber] = useState("");
    const[errorName, setErrorName] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(floorName.length < 4){
            setErrorName("Floor name too short");
        }
        if(!floorNumber){
            setErrorNumber("Floor number is required");
        }

        if (!errorName || !errorNumber) {
            addFloor(data, setData, floorNumber, floorName);
            onClose();
        }
    }

    const handleFloorNumberChange = (e) => {
        const value = e.target.value;
        setFloorNumber(value);

        if(existingFloors.includes(value)){
            setErrorNumber("Floor already exists");
        }else if (value > 6 || value < -3 ){
            setErrorNumber("Floor number out of range");

        }
        else{
            setErrorNumber("");
            setFloorNumber(value);
        }
    }

    const handleFloorNameChange = (e) => {
        const value = e.target.value;
        setFloorName(value);

        if(value.length > 4){
            setErrorName("");
            setFloorName(value);
        }
    }



    const divInputStyle = "flex flex-row justify-between space-x-5";

    if (!isVisible) {
        return null;
    }

    return (
        <ModalWindow isVisible={isVisible} onClose={onClose} title={modalTitle}>
            <div className="m-5">
                <form onSubmit={handleSubmit} className="space-y-5">

                    <Input id="floorNumber" label="Floor number:" type="number" error={errorNumber} value={floorNumber} onChange={handleFloorNumberChange}/>
                    <Input id="floorName" label="Floor name:" type="text"  error={errorName} value={floorName} onChange={handleFloorNameChange}/>

                    {(errorNumber || errorName) && <div
                        className="w-full text-center bg-red-400 shadow-md shadow-red-300 rounded-lg leading-loose">{errorNumber || errorName}</div>}

                    <div className="flex flex-row justify-between space-x-5 p-2">
                        <CancelButton onClick={onClose}/>
                        <SubmitButton label="Add"/>
                    </div>
                </form>

            </div>
        </ModalWindow>
    )
}


// import ModalWindow from "@/components/control-overlays/ModalWindow";
//
// export default function AddNewFloor({isVisible, onClose}) {
//
//     const modalTitle = "Add new floor";
//
//     if (!isVisible) {
//         return null;
//     }
//     return (
//         <>
//         <ModalWindow isVisible={isVisible} onClose={onClose} title={modalTitle}>
//             <h1>USUSUFUDUFSFU</h1>
//         </ModalWindow>
//         </>
//     )
// }