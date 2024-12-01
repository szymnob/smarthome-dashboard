'use client';

import {useContext, useState} from "react";
import DataContext from "@/app/dashboard/data/dataContext";
import Header from "@/components/ui/assets/RectHeader";

export default function Page(){
    const { data } = useContext(DataContext);


    return (
        <>
            <Header label="Dashboard"/>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
            </>
    );
}