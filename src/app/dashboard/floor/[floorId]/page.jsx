'use client';

import Header from "@/components/ui/assets/RectHeader";
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import RoomComponent from "@/components/views/room/RoomComponent";
import {getRoomsIdOnFloor} from "@/app/dashboard/data/dataService";


export default function Page({ params }) {
    const { data } = useContext(DataContext);
    const [floorNotFound, setFloorNotFound] = useState(false);
    const [roomsId, setRoomsId] = useState([]);

    const useParams = use(params);
    const floorId = useParams.floorId;


    useEffect(() => {
        if (data) {

            if (!data.home.floors[floorId]) {
                setFloorNotFound(true);
            } else {
                setFloorNotFound(false);
                setRoomsId(getRoomsIdOnFloor(data, floorId));
            }
        }
    }, [data]);

    if (floorNotFound) {
        return (
            <div className="h-auto w-auto flex justify-center items-center p-6 bg-red-500 text-white">
                <h1 className="text-4xl font-bold">Floor not found</h1>
            </div>
        );
    }
    return (
        <>
            <Header label={`Floor ${floorId}`}/>
            <div className="flex flex-wrap">
            {roomsId.map((roomId) => (
                <RoomComponent key={roomId} floorId={floorId} roomId={roomId} />
            ))}
            </div>
        </>
    );
}
