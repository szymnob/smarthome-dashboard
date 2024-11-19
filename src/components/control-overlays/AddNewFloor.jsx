
import ModalWindow from "@/components/control-overlays/ModalWindow";
import {useContext, useEffect, useState} from "react";
import dataContext from "@/app/dashboard/dataContext";
import {addFloor, getFloorsNumbers, getRoomsIdOnFloor} from "@/app/dashboard/dataService";
import DataContext from "@/app/dashboard/dataContext";
import Input from "@/components/control-overlays/Input";

export default function AddNewFloor({onClose}) {
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

        else if (!errorName && !errorNumber) {
            console.log("sdfsd", floorName, floorNumber);
            addFloor(data, setData, floorNumber, floorName);
            onClose();
        }
    }

    const handleFloorNumberChange = (e) => {
        const value = e.target.value;
        setFloorNumber(value);

        if(existingFloors.includes(value)){
            setErrorNumber("Floor already exists");
        }else if (value > 6 || value < -3){
            setErrorNumber("Floor number out of range");

        }
        else{
            setErrorNumber("");
            setFloorNumber(value);
        }
    }



    const divInputStyle = "flex flex-row justify-between space-x-5";

    return (
            <div className="m-5">
                <form onSubmit={handleSubmit} className="space-y-5">

                    <Input id="floorNumber" label="Floor number:" type="number" error={errorNumber} value={floorNumber} onChange={handleFloorNumberChange}/>
                    <Input id="floorName" label="Floor name:" type="text"  error={errorName} value={floorName} onChange={(e) => setFloorName(e.target.value)}/>

                    {(errorNumber || errorName) && <div
                        className="w-full text-center bg-red-400 shadow-md shadow-red-300 rounded-lg leading-loose">{errorNumber || errorName}</div>}

                    <div className="flex flex-row justify-between space-x-5 p-2">
                        <button className="flex-1 text-gray-700 bg-gray-100 leading-loose rounded-md border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 shadow-sm" onClick={onClose}>Cancel</button>

                        <button className="flex-1 text-white bg-violet-500 leading-loose rounded-md border-2 border-violet-700 active:bg-violet-600 shadow-md shadow-violet-500 active:shadow-violet-500 active:shadow-lg hover:bg-violet-400 "
                            type="submit">Add</button>
                    </div>
                </form>

            </div>
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