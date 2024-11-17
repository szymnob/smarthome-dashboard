'use client';

import Header from "@/app/ui/dashboard/RectHeader";

import { useContext, useEffect, useState } from 'react';
import DataContext from '@/app/dashboard/dataContext';
import {useRouter} from "next/navigation";
import {getFloorsNumbers} from "@/app/dashboard/dataService";

export default function Page() {
    const router = useRouter();
    const { data } = useContext(DataContext);


    useEffect(() => {
        if(router.isReady && data){
            const floorNumbers = getFloorsNumbers(data);
            const floorId = router.query.floorId;
            console.log("Numer piętra: ");
            console.log(floorId);
            if(!data.home.floors[floorId]){
                return(
                    <>
                        <h1 className="text-2xl text-bold">Floor not found</h1>
                    </>
                )
            }
        };
    }, [router.isReady, data]);

    if(!data) return null;




    return(
        <>
            <Header>
                <h1 className="text-2xl text-bold">Floor 1</h1>
            </Header>
        </>
    )
}