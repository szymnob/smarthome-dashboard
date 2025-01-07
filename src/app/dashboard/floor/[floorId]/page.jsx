'use client';

import Header from "@/components/ui/assets/RectHeader";
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import RoomComponent from "@/components/views/room/RoomComponent";
import {getRoomsIdOnFloor} from "@/app/dashboard/data/dataService";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'; //ikony plus minus


export default function Page({ params }) {
    const { data, /*Dodane*/ setData } = useContext(DataContext);
    const [floorNotFound, setFloorNotFound] = useState(false);
    const [roomsId, setRoomsId] = useState([]);

    const useParams = use(params);
    const floorId = useParams.floorId;

    //Dodane//
    const [isEditing, setIsEditing] = useState(false);
    //Dodane//


    useEffect(() => {
        if (data) {

            if (!data.home.floors[floorId]) {
                setFloorNotFound(true);
            } else {
                setFloorNotFound(false);
                setRoomsId(getRoomsIdOnFloor(data, floorId));
            }
        }
    }, [data, /*Dodane*/ floorId /*Dodane*/]);

    //Dodane
    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };
    //Dodane

    if (floorNotFound) {
        return (
            <div className="h-auto w-auto flex justify-center items-center p-6 bg-red-500 text-white">
                <h1 className="text-4xl font-bold">Floor not found</h1>
            </div>
        );
    }
    return (
        <>
            <Header label={`Floor ${floorId}`}
            //Dodane
            isEditing={isEditing}
            onEditToggle={handleEditToggle}
            //Dodane
            />
            
            <div className="flex flex-wrap">
            {roomsId.map((roomId) => (
                <RoomComponent 
                key={roomId} 
                floorId={floorId} 
                roomId={roomId}
                isEditing={isEditing}/>
            ))}
            
            {/*Przycisk + Add room widoczny tylko w trybie edycji*/}
            {isEditing && (
                    <div className="flex flex-col space-y-2 m-2">
                        <label>Add/Remove Room</label>
                        <button
                            onClick={() => {
                                // Na razie przycisk nic nie robi
                                console.log('Przycisk + Add room został kliknięty');
                            }}
                            className="flex items-center justify-center w-28 h-28 bg-green-500 text-white text-7xl rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
                            title="Add room"
                        >
                            <PlusIcon className="h-16 w-16" /> 
                        </button>
                        <button
                            onClick={() => {
                                // Na razie przycisk nic nie robi
                                console.log('Przycisk - Remove room został kliknięty');
                            }}
                            className="flex items-center justify-center w-28 h-28 bg-red-500 text-white text-7xl rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                            title="Remove room"
                        >
                             <MinusIcon className="h-16 w-16" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
