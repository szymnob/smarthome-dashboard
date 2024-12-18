import React from 'react';
import * as PropTypes from "prop-types";

export default function Switch({ checked = false, onChange, size='small' }) {

    const label = null;


    const sizeClasses = {
        small: ' w-9 h-5 after:top-[2px] after:start-[2px] after:h-4 after:w-4',
        medium: 'w-11 h-6 after:top-[2px] after:start-[2px] after:h-5 after:w-5',
        large: 'w-14 h-7 after:top-0.5 after:start-[4px] after:h-6 after:w-6',
    };

    const selectedSizeClass = sizeClasses[size];

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
            />
            <div
                className={`${selectedSizeClass} relative bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-violet-700`}></div>
            {label && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
        </label>
    );
}

Switch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
}