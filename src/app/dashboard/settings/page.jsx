"use client";

import ProfileSettings from "@/components/views/settings/ProfileSettings";
import Header from "@/components/ui/assets/RectHeader";
import React, { useState } from 'react';

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
        <Header label="Settings" />
        <div className="m-10">
            <ProfileSettings />
        </div>
        </>
    );

}