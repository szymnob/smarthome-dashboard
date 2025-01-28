'use client';

import Header from "@/components/ui/assets/RectHeader";
import DataContext from "./data/dataContext";
import { useContext, useEffect, useState } from "react";
import { getFloorsNumbers, getRoomsIdOnFloor, getRoomName, getDevicesIdInRoom, getFavourites, getDeviceNameById } from "./data/dataService";
import DeviceComponent from "@/components/views/device-views/DeviceComponent";
import Script from "next/script";
import WeatherWidget from "@/components/ui/assets/WeatherWIdget";
import WelcomeMessage from "@/components/ui/assets/WelcomeMessage";
import EnergyConsumptionChart, {DailyEnergyConsumptionChart} from "@/components/ui/assets/EnergyConsumptionChart";

export default function Page() {
    const { data } = useContext(DataContext);
    const [devices, setDevices] = useState([])
    const [locations, setLocations] = useState({})

    useEffect(() => {
        if (!data) {
            return;
        }

        const devices = getFavourites(data);
        const locations = {};
        getFloorsNumbers(data).forEach(floor => {
            getRoomsIdOnFloor(data, floor).forEach(room => {
                getDevicesIdInRoom(data, floor, room)
                    .filter(device => devices.includes(device))
                    .forEach(device => {
                        locations[device] = [floor, getRoomName(data, floor, room)];
                    });
            });
        }); // TODO: not efficient

        setLocations(locations);
        setDevices(devices);
    }, [data]);

    return (
        <>
            <Header label="Dashboard"/>

            <hr className="my-5"/>

            <div className="">
                <WelcomeMessage/>
            </div>

            <hr className="my-5"/>

            <div className="m-5">
            <WeatherWidget/>
            </div>

            <hr className="my-5"/>

            <div
                className="flex flex-wrap bg-neutral-50 shadow-md border-custom rounded-lg m-5 p-4 mb-4 justify-center">
                <h2 className="text-2xl font-bold mb-4 text-center w-full">Favourite Devices</h2>
                <div className="flex flex-wrap justify-center">
                    {devices.map(id => (
                        <DeviceComponent key={id} deviceId={id} location={locations[id]}/>
                    ))}
                </div>
            </div>





            <hr className="my-10"/>


            {/* TODO: This should be divided into smaller components */}
            <div className="flex flex-wrap justify-center">
                {devices.length > 0 && (
                    <div className="flex flex-col m-4 w-full max-w-7xl">
                        <h1 className="text-3xl font-bold text-center mb-5">Home Overview</h1>
                        <div className="flex flex-col items-center">

                            <div className="flex flex-row m-3 justify-center lg:p-10 w-full items-center">
                                <div className="min-h-60 flex-1">
                                    <EnergyConsumptionChart/>

                                </div>
                                <div className="min-h-60 flex-1">
                                    <DailyEnergyConsumptionChart/>

                                </div>
                            </div>

                            <div
                                className="flex flex-wrap bg-neutral-50 shadow-md border-custom rounded-lg mt-2 p-4 w-full justify-center">
                                <h2 className="text-2xl font-bold mb-4 text-center w-full">Home Layout</h2>
                                <div className="flex flex-wrap justify-center">
                                    {getFloorsNumbers(data).map(floor => {
                                        const rooms = getRoomsIdOnFloor(data, floor);
                                        return (
                                            <div key={floor} className="m-2 p-2 border rounded w-full">
                                                <h3 className="text-xl font-bold mb-2 text-center">Floor {floor}</h3>
                                                {rooms.length > 0 ? (
                                                    <div className="flex flex-wrap justify-center">
                                                        {rooms.map(room => {
                                                            const roomDevices = getDevicesIdInRoom(data, floor, room);
                                                            return (
                                                                <div key={room}
                                                                     className="ml-4 mb-6 w-full md:w-1/2 lg:w-1/3 border p-4 rounded">
                                                                    <p className="text-center font-bold mb-2">{getRoomName(data, floor, room)}</p>
                                                                    {roomDevices.length > 0 ? (
                                                                        <div className="ml-4">
                                                                            {roomDevices.map(device => (
                                                                                <p key={device} className="text-center">
                                                                                    <strong>Device:</strong> {getDeviceNameById(data, device)}
                                                                                </p>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <p className="text-center">No devices in this
                                                                            room</p>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="text-center">No rooms on this floor</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}