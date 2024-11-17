
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/dataContext';
import {getDeviceNameById, getDeviceStateById} from "@/app/dashboard/dataService";
import Switch from "@/components/Switch";
import clsx from "clsx";


export default function DeviceComponent({deviceId}) {
    const {data} = useContext(DataContext);

    const [deviceName, setDeviceName] = useState("")
    const [deviceState, setDeviceState] = useState("")
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (data) {
            const name = getDeviceNameById(data, deviceId);
            const state = getDeviceStateById(data, deviceId);

            setDeviceName(name);
            setDeviceState(state);
            if (state && state.status) {
                setStatus(state.status);
            }
        }
    }, [data, deviceId]);

    if (!deviceState || !status) {
        return <div className="flex items-center justify-center p-5">Loading...</div>;
    }


    const handleChange = () => {
        status === "ON" ? setStatus("OFF") : setStatus("ON");
        // onToggle(device.id, newState);
    };

    return (
        <div className={clsx(
            "flex flex-col items-center justify-center bg-white rounded-xl shadow-md w-48 m-5",
            {
                "bg-violet-600": status === "ON",
            }
        )}>

            <div className={clsx("flex w-full flex-col p-5",
                {
                    "text-white": status === "ON",
                })}>
                <div className="flex flex-row w-full justify-between">
                    <div>{status}</div>
                    <Switch checked={status === "ON"} onChange={handleChange}/>
                </div>

                <div className="flex flex-row justify-between">
                    <img src="https://via.placeholder.com/120" alt="Device" className="w-10 h-10 rounded-full"/>
                    <img src="https://via.placeholder.com/80" alt="Device" className="w-10 h-10 rounded-full"/>
                </div>
                <div>

                </div>
                    <p className="text-left mt-2">{deviceName}</p>
                </div>

        </div>
    );
}
