'use client';

import {useContext, useState} from "react";
import DataContext from "@/app/dashboard/dataContext";

export default function Page(){
    const { data } = useContext(DataContext);


    return (
        <>
        <p>Homepagesdsds</p>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
            </>
    );
}