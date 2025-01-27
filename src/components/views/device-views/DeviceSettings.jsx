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
import { Tooltip } from "react-tooltip";
import Blinds from "@/components/views/device-views/types/Blinds";
import Light from "@/components/views/device-views/types/Light";
import AirConditioner from "@/components/views/device-views/types/AirConditioner";
import Heater from "@/components/views/device-views/types/Heater";


export default function DeviceSettings({isVisible, onClose, deviceId, deviceStatus, setDeviceStatus}) {

    const {data, setData} = useContext(DataContext);

    const [deviceName, setDeviceName] = useState("")
    const [deviceState, setDeviceState] = useState("")
    const [status, setStatus] = useState("");
    
    const[deviceProperties, setDeviceProperties] = useState(null);
    const[deviceType, setDeviceType] = useState("");

    const[SpecificTypeComponent, setSpecificTypeComponent] = useState(null);

    const[isFavourite, setIsFavourite] = useState(false);


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

            const favourites = getFavourites(data);

            favourites.includes(deviceId) ? setIsFavourite(true) : setIsFavourite(false);

            setDeviceName(name);
            setDeviceState(state);
            setDeviceType(type);

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
            changeDeviceName(setData, deviceId, deviceName);
        }
    }, [deviceName]);

    const handleFavouriteChange = () => {
        setData(changeFavouriteStatus(data, deviceId, !isFavourite)); // FIXME: double add
        setIsFavourite(!isFavourite);
    }

    const handleDelete = () => {
        console.log("delete")
        deleteDeviceById(setData ,deviceId);
        onClose();
    }

    const favouriteText = `${!isFavourite ? "Add to" : "Remove from"} favourites`;
    const headerActions = (
        <>
            <div id="favourite" className={clsx(
                "w-9 h-auto cursor-pointer rounded-md hover:bg-neutral-200 hover:scale-105",
                isFavourite ? "animate-add" : "animate-delete"
            )}
                 onClick={handleFavouriteChange}>
                <img className="w-full h-auto" src={isFavourite ? "/icons/heart_solid.svg" : "/icons/heart_outline.svg"} alt={favouriteText}/>
            </div>
            <Tooltip anchorSelect="#favourite" content={favouriteText} place="right" delayShow={500} />

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
            <div className='m-5 flex flex-col space-y-4 w-[300px]'>
                <div className="flex flex-row justify-between items-center">
                <img src={`/icons/devices/${deviceType}.svg`} alt={deviceType} className="w-12 h-auto"/>
                    <Switch id={deviceId} size='large' checked={deviceStatus === "ON"} onChange={setDeviceStatus}/>
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
    "rgb_light": RgbLight,
    "blinds": Blinds,
    "light": Light,
    "air_conditioner": AirConditioner,
    "heater": Heater,
}


DeviceSettings.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    deviceId: PropTypes.string.isRequired
}