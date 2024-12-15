import * as PropTypes from "prop-types";
import ModalWindow from "@/components/ui/assets/ModalWindow";
import {useContext, useEffect, useState} from "react";
import DataContext from "@/app/dashboard/data/dataContext";
import {
    getDeviceNameById,
    getDeviceStateById,
    getDeviceTypeById,
    saveDeviceProperties
} from "@/app/dashboard/data/dataService";
import Switch from "@/components/ui/assets/Switch";
import RgbLight from "@/components/views/device-views/types/RgbLight";
import Schedule from "@/components/ui/assets/Schedule";


export default function DeviceSettings({isVisible, onClose, deviceId, deviceStatus, setDeviceStatus}) {

    const {data} = useContext(DataContext);

    const [deviceName, setDeviceName] = useState("")
    const [deviceState, setDeviceState] = useState("")
    const [status, setStatus] = useState("");
    
    const[deviceProperties, setDeviceProperties] = useState(null);
    const[deviceType, setDeviceType] = useState("");

    const[SpecificTypeComponent, setSpecificTypeComponent] = useState(null);


    //ten useEffect powoduje zbyt duza liczba renderow do naprawy
    useEffect(() => {
        if (data) {
            const name = getDeviceNameById(data, deviceId);
            const state = getDeviceStateById(data, deviceId);
            const type = getDeviceTypeById(data, deviceId);

            setDeviceName(name);
            setDeviceState(state);
            setDeviceType(type);

            // xddd bez fumkcji anonimowej nie dziala jebane, dowiedziec sie dlaczego
            setSpecificTypeComponent(() => typesToComponents[type]);


            if (state) {
                setStatus(state.status);
                setDeviceProperties(state.properties);
            }

        }
    }, [data, deviceId]);

    useEffect(() => {
        if(deviceProperties !== null){
        saveDeviceProperties(data, deviceId, deviceProperties);
        }
    }, [ deviceProperties]);

    return(
        <ModalWindow isVisible={isVisible} onClose={onClose} title={deviceName}>
            <div className='m-8 flex flex-col space-y-4'>
                <div className="flex flex-row justify-between items-center">
                    <img src={`/icons/${deviceType}.svg`} alt={deviceType} className="w-12 h-auto"/>
                    <Switch size='large' checked={deviceStatus === "ON"} onChange={setDeviceStatus}/>
                </div>

                {SpecificTypeComponent ? (
                    <SpecificTypeComponent
                        properties={deviceProperties}
                        setProperties={setDeviceProperties}
                    />
                ) : (
                    <p>No settings available for this device type: {deviceType}</p>
                )}

                <Schedule data={data} deviceId={deviceId}/>
            </div>

        </ModalWindow>
    )
}


const typesToComponents={
    "rgb_light": RgbLight
}


DeviceSettings.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    deviceId: PropTypes.string.isRequired
}