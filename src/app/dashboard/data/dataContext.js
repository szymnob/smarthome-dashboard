'use client';

import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const savedData = localStorage.getItem("savedData");
            if (savedData) {
                console.debug("Data loaded: ", savedData);
                setData(JSON.parse(savedData));
                return;
            }

            const response = await fetch('/home.json');
            const data = await response.json();
            setData(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            console.debug("Data saved: ", data);
            localStorage.setItem("savedData", JSON.stringify(data));
        }
    }, [data]);

    return (
        //przechowywanie danych w domie
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
