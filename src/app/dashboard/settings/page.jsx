"use client";

import Header from "@/components/ui/assets/RectHeader";
import React, { useState } from 'react';
import Checkbox from "@/components/ui/assets/Checkbox";
import Select from "@/components/ui/assets/Select";

// export default function Settings() {
//     return (
//         <Header label="Settings"/>

//     );
// }

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <Header label="Settings" />

                <div className="settings-content border-custom rounded-lg p-7 m-5 shadow-md flex flex-col space-y-3">

                    <Checkbox label="Dark Mode" checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>

                    <Checkbox label="Show notifications"/>

                    <Select label="Language">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </Select>

                </div>

        </>
    );

}