import React, { useState } from 'react';

export default function Switch({ checked = false, onChange }) {
    const [isChecked, setIsChecked] = useState(checked);

    const label = null;
    const handleToggle = () => {
        setIsChecked(!isChecked);
        if (onChange) {
            onChange(!isChecked);
        }
    };

    return (
        <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked}
                onChange={handleToggle}
            />
            <div
                className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-700"></div>
            {label && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
        </label>
    );
}
