import Header from "@/app/ui/dashboard/RectHeader";
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/dataContext';
import {getDeviceNameById, getDeviceStateById} from "@/app/dashboard/dataService";
import Switch from "@/components/Switch";


export default function DeviceComponent({deviceId}) {
    const {data} = useContext(DataContext);

    const [deviceName, setDeviceName] = useState("")
    const [deviceState, setDeviceState] = useState("")
    const [status, setStatus] = useState("OFF");

    useEffect(() => {
        if (data) {
            setDeviceName(getDeviceNameById(data, deviceId));
            setDeviceState(getDeviceStateById(data, deviceId));

            setStatus(deviceState.status);
        }
    }, [data, deviceId]);


    const handleChange = () => {
        status === "ON" ? setStatus("OFF") : setStatus("ON");
        // onToggle(device.id, newState);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md w-48 m-5">
            <div className="flex w-full flex-col p-5">
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
