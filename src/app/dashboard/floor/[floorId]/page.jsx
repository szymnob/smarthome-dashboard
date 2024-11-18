'use client';

import Header from "@/app/ui/dashboard/RectHeader";
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/dataContext';
import RoomComponent from "@/components/controls/RoomComponent";
import {getRoomsIdOnFloor} from "@/app/dashboard/dataService";
import DeviceComponent from "@/components/controls/DeviceComponent";


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
            <Header>
                <h1 className="text-4xl text-bold">{`Floor ${floorId}`}</h1>
            </Header>
            <div className="flex flex-wrap">
            {roomsId.map((roomId) => (
                <RoomComponent key={roomId} floorId={floorId} roomId={roomId} />
            ))}
            </div>
        </>
    );
}
