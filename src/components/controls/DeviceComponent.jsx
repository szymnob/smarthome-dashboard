
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/dataContext';
import {getDeviceNameById, getDeviceStateById, getDeviceTypeById} from "@/app/dashboard/dataService";
import Switch from "@/components/controls/Switch";
import clsx from "clsx";


export default function DeviceComponent({deviceId}) {
    const {data} = useContext(DataContext);

    const [deviceName, setDeviceName] = useState("")
    const [deviceState, setDeviceState] = useState("")
    const [status, setStatus] = useState(null);
    const [deviceType, setDeviceType] = useState("");

    useEffect(() => {
        if (data) {
            const name = getDeviceNameById(data, deviceId);
            const state = getDeviceStateById(data, deviceId);
            const type = getDeviceTypeById(data, deviceId);

            setDeviceName(name);
            setDeviceState(state);
            setDeviceType(type);

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
            "flex flex-col items-center justify-center border-2 border-solid border-violet-200 bg-white rounded-xl shadow-md w-48 m-5",
            {
                "bg-gradient-radial from-violet-500 to-violet-600 border-violet-600 shadow-violet-500": status === "ON",

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
                    <img src={`/icons/${deviceType}.svg`} alt={deviceName} className={clsx("w-12 h-12",{
                        "brightness-0 invert": status === "ON",
                    }
                    )}/>
                    <img src="/icons/settings.svg" alt="Device" className={clsx("w-10 h-10",{
                        "brightness-0 invert": status === "ON",
                    })}/>

                </div>
                <div>

                </div>
                    <p className="text-left mt-2">{deviceName}</p>
                </div>

        </div>
    );
}
