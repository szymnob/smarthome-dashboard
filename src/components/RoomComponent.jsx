import Header from "@/app/ui/dashboard/RectHeader";
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/dataContext';
import {getDevicesIdInRoom, getFloorName, getRoomName} from "@/app/dashboard/dataService";
import DeviceComponent from "@/components/DeviceComponent";


export default function RoomComponent({floorId, roomId}) {
    const { data } = useContext(DataContext);

    const [roomName, setRoomName] = useState("")

    const [devicesId, setDevicesId] = useState([])


    useEffect(() => {
        if(data){
            setRoomName(getRoomName(data, floorId, roomId));
            setDevicesId(getDevicesIdInRoom(data, floorId, roomId));
        }
    }, [data]);

    console.log(devicesId);

    return (
        <>
            <div className="pt-5">
                <div className="m5">
                    <h1 className="text-2xl text-bold text-center">{roomName}</h1>
                </div>
                <div className="flex flex-col w-full justify-between bg-gray-300 rounded-lg mt-5">

                    <div className="flex flex-row ">
                        {devicesId.map((deviceId) => (
                            <DeviceComponent key={deviceId} deviceId={deviceId}/>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}