import Header from "@/components/ui/assets/RectHeader";
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import {getDevicesIdInRoom, getFloorName, getRoomName} from "@/app/dashboard/data/dataService";
import DeviceComponent from "@/components/views/device-views/DeviceComponent";


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
            <div className="flex flex-col m-8">
                <div className="m5 ">
                    <h1 className="text-2xl text-bold text-center">{roomName}</h1>
                </div>
                <div className="flex flex-wrap bg-neutral-50 shadow-md border-custom rounded-lg mt-2 p-2  ">
                        {devicesId.map((deviceId) => (
                            <DeviceComponent key={deviceId} deviceId={deviceId}/>
                        ))}
                </div>
            </div>

    );
}