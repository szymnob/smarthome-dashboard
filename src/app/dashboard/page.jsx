'use client';

import Header from "@/components/ui/assets/RectHeader";
import DataContext from "./data/dataContext";
import { useContext, useEffect, useState } from "react";
import { getFavourites } from "./data/dataService";
import DeviceComponent from "@/components/views/device-views/DeviceComponent";

export default function Page() {
    const { data } = useContext(DataContext);
    const [devices, setDevices] = useState([])

    useEffect(() => {
        if (data) {
            setDevices(getFavourites(data));
        }
    }, [data]);

    return (
        <>
            <Header label="Dashboard" />

            <div className="flex flex-wrap">
                {devices.length && (
                    <div className="flex flex-col m-8">
                        <div className="m5">
                            <h1 className="text-2xl font-bold text-center">Favourites</h1>
                        </div>
                        <div className="flex flex-wrap bg-neutral-50 shadow-md border-custom rounded-lg mt-2 p-2">
                            {devices.map(id => (
                                <DeviceComponent key={id} deviceId={id} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}