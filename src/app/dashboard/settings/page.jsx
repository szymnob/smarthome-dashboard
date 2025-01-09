"use client";

import Header from "@/components/ui/assets/RectHeader";
import React, { useState } from 'react';

// export default function Settings() {
//     return (
//         <Header label="Settings"/>

//     );
// }

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="settings-page">
            <Header label="Settings" />
            <div className="settings-content">
                <div className="setting-item">
                    <label htmlFor="darkModeToggle">Dark Mode</label>
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                </div>
                <div className="setting-item">
                    <label htmlFor="notificationToggle">Notifications</label>
                    <input type="checkbox" id="notificationToggle" />
                </div>
                <div className="setting-item">
                    <label htmlFor="languageSelect">Language</label>
                    <select id="languageSelect">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </div>
        </div>
    );

}