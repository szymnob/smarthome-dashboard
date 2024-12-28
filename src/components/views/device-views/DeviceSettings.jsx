import * as PropTypes from "prop-types";
import ModalWindow from "@/components/ui/assets/modals/ModalWindow";
import {useContext, useEffect, useState} from "react";
import DataContext from "@/app/dashboard/data/dataContext";
import {
    changeDeviceName,
    changeFavouriteStatus, deleteDeviceById, deviceExists,
    getDeviceNameById,
    getDeviceStateById,
    getDeviceTypeById, getFavourites,
    saveDeviceProperties
} from "@/app/dashboard/data/dataService";
import Switch from "@/components/ui/assets/Switch";
import RgbLight from "@/components/views/device-views/types/RgbLight";
import Schedule from "@/components/views/device-views/Schedule";
import clsx from "clsx";
import DropdownSettings from "@/components/ui/assets/modals/DropdownSettings";
import DeleteConfirmation from "@/components/ui/assets/modals/DeleteConfirmation";
import ChangeName from "@/components/ui/assets/modals/ChangeName";


const USERID = 1

export default function DeviceSettings({isVisible, onClose, deviceId, deviceStatus, setDeviceStatus}) {

    const {data} = useContext(DataContext);
    const {setData} = useContext(DataContext);

    const [deviceName, setDeviceName] = useState("")
    const [deviceState, setDeviceState] = useState("")
    const [status, setStatus] = useState("");
    
    const[deviceProperties, setDeviceProperties] = useState(null);
    const[deviceType, setDeviceType] = useState("");

    const[SpecificTypeComponent, setSpecificTypeComponent] = useState(null);

    const[isFavorite, setIsFavorite] = useState(false);


    const[isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const[isChangeNameModalVisible, setIsChangeNameModalVisible] = useState(false);

    //ten useEffect powoduje zbyt duza liczba renderow do naprawy
    useEffect(() => {
        if (!deviceExists(data, deviceId)) {
            onClose();
            return;
        }
        if (data) {
            const name = getDeviceNameById(data, deviceId);
            const state = getDeviceStateById(data, deviceId);
            const type = getDeviceTypeById(data, deviceId);

            const favourites = getFavourites(data, USERID);

            favourites.includes(deviceId) ? setIsFavorite(true) : setIsFavorite(false);

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

    useEffect(() => {
        if(deviceName !== ""){
            changeDeviceName(data, setData, deviceId, deviceName);
        }
    }, [deviceName]);

    const handleFavouriteChange = () => {
        setIsFavorite(prevState => {
            const newState = !prevState;
            changeFavouriteStatus(data, USERID, deviceId, newState);
            return newState;
        })
    }

    const handleDelete = () => {
        console.log("delete")
        deleteDeviceById(data, setData ,deviceId);
        onClose();
    }

    const headerActions = (
        <>
            <div className={clsx(
                "w-9 h-auto cursor-pointer rounded-md hover:bg-neutral-200 hover:scale-105",
                isFavorite ? "animate-add" : "animate-delete"
            )}
                 onClick={handleFavouriteChange}>
                <img className="w-full h-auto" src={isFavorite ? "/icons/heart_solid.svg" : "/icons/heart_outline.svg"} alt="Add to favorites"/>
            </div>

            <DropdownSettings
                onDelete={()=>setIsDeleteModalVisible(true)}
                onRename={()=>setIsChangeNameModalVisible(true)}
            />
            {/*<div className="w-9 h-auto cursor-pointer rounded-md hover:bg-neutral-200 hover:scale-105 "*/}
            {/*     onClick={onClose}>*/}
            {/*    <img className="w-full h-auto" src="/icons/menu.svg" alt="Menu"/>*/}
            {/*</div>*/}
        </>
    )

    return (
        <>
        <ModalWindow isVisible={isVisible} onClose={onClose} title={deviceName} headerActions={headerActions}>
            <div className='m-5 flex flex-col space-y-4'>
                <div className="flex flex-row justify-between items-center">
                <img src={`/icons/devices/${deviceType}.svg`} alt={deviceType} className="w-12 h-auto"/>
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

        <DeleteConfirmation
            isVisible={isDeleteModalVisible}
            onClose={() => setIsDeleteModalVisible(false)}
            onDelete={handleDelete}
            name={deviceName}
            />

        <ChangeName
            isVisible={isChangeNameModalVisible}
            onClose={() => setIsChangeNameModalVisible(false)}
            name={deviceName}
            setName={setDeviceName}
        />

        </>
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