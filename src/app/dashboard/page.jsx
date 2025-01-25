'use client';

import Header from "@/components/ui/assets/RectHeader";
import DataContext from "./data/dataContext";
import { useContext, useEffect, useState } from "react";
import { getFloorsNumbers, getRoomsIdOnFloor, getRoomName, getDevicesIdInRoom, getFavourites } from "./data/dataService";
import DeviceComponent from "@/components/views/device-views/DeviceComponent";
import Script from "next/script";
import WeatherWidget from "@/components/ui/assets/WeatherWIdget";

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

            <div className="m-5">
                <WeatherWidget/>
            </div>

            <div className="flex flex-wrap">
                {devices.length != 0 && (
                    <div className="flex flex-col m-8">
                        <div className="m5">
                            <h1 className="text-2xl font-bold text-center">Favourites</h1>
                        </div>
                        <div className="flex flex-wrap bg-neutral-50 shadow-md border-custom rounded-lg mt-2 p-2">
                            {devices.map(id => (
                                <DeviceComponent key={id} deviceId={id} location={locations[id]}/>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}