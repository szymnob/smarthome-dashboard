
import { useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import {
    deviceExists,
    getDeviceNameById,
    getDeviceStateById,
    getDeviceTypeById,
    updateDeviceState
} from "@/app/dashboard/data/dataService";
import Switch from "@/components/ui/assets/Switch";
import clsx from "clsx";
import DeviceSettings from "@/components/views/device-views/DeviceSettings";
import * as PropTypes from "prop-types";



export default function DeviceComponent({deviceId}) {
    const {data} = useContext(DataContext);

    const [deviceName, setDeviceName] = useState("")
    const [deviceState, setDeviceState] = useState("")
    const [deviceStatus, setDeviceStatus] = useState(null);
    const[deviceProperties, setDeviceProperties] = useState(null)
    const [deviceType, setDeviceType] = useState("");

    const [isDevice, setIsDevice] = useState(false);

    const [showDeviceControls, setShowDeviceControls] = useState(false);
    const closeDeviceControls = () => setShowDeviceControls(false);

    useEffect(() => {
        if (!deviceExists(data, deviceId)) {
            return;
        }
        else if (data) {
            const name = getDeviceNameById(data, deviceId);
            const state = getDeviceStateById(data, deviceId);
            const type = getDeviceTypeById(data, deviceId);

            setDeviceName(name);
            setDeviceState(state);
            setDeviceType(type);

            if (state && state.status) {
                setDeviceStatus(state.status);
                setDeviceProperties(state.properties)

            }
        }
    }, [data, deviceId]);


    if (!deviceState || !deviceStatus) {
        return <div className="flex items-center justify-center p-5">Loading...</div>;
    }


    const handleChange = () => {
        setDeviceStatus(prevStatus => {
            const newStatus = prevStatus === "ON" ? "OFF" : "ON";
            updateDeviceState(data, deviceId, newStatus);
            return newStatus;
        });
        console.log(deviceProperties)
    };




    return (
        <>
        <div className={clsx(
            "flex flex-col items-center justify-center transition duration-200 border-2 border-solid border-violet-200 bg-white rounded-xl shadow-md w-48 m-5",
            {
                "bg-gradient-radial from-violet-500 to-violet-600 border-violet-600 shadow-violet-500": deviceStatus === "ON",

            }
        )}>

            <div className={clsx("flex w-full flex-col p-5",
                {
                    "text-white": deviceStatus === "ON",
                })}>
                <div className="flex flex-row w-full justify-between items-center mb-3">
                    <div>{deviceStatus}</div>
                    <Switch checked={deviceStatus === "ON"} onChange={handleChange}/>
                </div>

                <div className="flex flex-row justify-between">
                    <img src={`/icons/devices/${deviceType}.svg`} alt={deviceName} className={clsx("w-12 h-12",{
                        "brightness-0 invert": deviceStatus === "ON",
                    }
                    )}/>
                    <img src="/icons/settings.svg" alt="Device" onClick={() => setShowDeviceControls(prev => !prev)}
                         className={clsx("w-10 h-10 hover:scale-105 cursor-pointer",{
                        "brightness-0 invert": deviceStatus === "ON",
                    })}/>

                </div>
                <div>

                </div>
                    <p className="text-left mt-2">{deviceName}</p>
                </div>
        </div>

            <DeviceSettings isVisible={showDeviceControls} onClose={closeDeviceControls} deviceId={deviceId} deviceStatus={deviceStatus} setDeviceStatus={handleChange}/>

        </>
    );
}

DeviceComponent.propTypes = {
    deviceId: PropTypes.string.isRequired,
}
