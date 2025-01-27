import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dataMonthly = [
    { name: "January", value: 120 },
    { name: "February", value: 150 },
    { name: "March", value: 180 },
    { name: "April", value: 200 },
    { name: "May", value: 220 },
    { name: "June", value: 250 },
];

const dataDaily = [
    { name: "Monday", value: 2.0 },
    { name: "Tuesday", value: 2.5 },
    { name: "Wednesday", value: 2.2 },
    { name: "Thursday", value: 2.7 },
    { name: "Friday", value: 3.0 },
    { name: "Saturday", value: 3.5 },
    { name: "Sunday", value: 2.8 },
];

export default function EnergyConsumptionChart() {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dataMonthly} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="rgba(75, 192, 192, 0.6)" name="Energy Consumption (kWh)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function DailyEnergyConsumptionChart() {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dataDaily} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="rgba(153, 102, 255, 0.6)" name="Energy Consumption (kWh)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
