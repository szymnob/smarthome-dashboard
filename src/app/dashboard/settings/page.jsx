"use client";

import ProfileSettings from "@/components/views/settings/ProfileSettings";
import Header from "@/components/ui/assets/RectHeader";
import React, { useState } from 'react';
import Checkbox from "@/components/ui/assets/Checkbox";
import Select from "@/components/ui/assets/Select";

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
        <Header label="Settings" />
        <div className="m-10">
            <ProfileSettings />
        </div>


        {/*TODO: Rest of the settings*/}
        {/* <Checkbox label="Dark Mode" checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>

        <Checkbox label="Show notifications"/>

        <Select label="Language">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
        </Select> */}
        </>
    );

}