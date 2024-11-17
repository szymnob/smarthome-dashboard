'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from "clsx";

import {useContext, useState} from "react";
import DataContext from "@/app/dashboard/dataContext";

import {getFloorsNumbers} from "@/app/dashboard/dataService";

const links = [
    { name: '1', href: '/dashboard/floor-1', icon: 'https://via.placeholder.com/40' },
    { name: '2', href: '/floor/2', icon: 'https://via.placeholder.com/40' },
    { name: '3', href: '/floor/3', icon: 'https://via.placeholder.com/40' },
];



export default function Navigation() {
    const pathname = usePathname();

    const { data } = useContext(DataContext);
    if(!data) return null;
    const floorNumbers = getFloorsNumbers(data);

    return (
        <>
            <div className="h-screen w-20 bg-gray-300 flex flex-col justify-between items-center py-4">
                {/* Górna sekcja */}
                <div className="flex flex-col items-center space-y-6">
                    <Link
                        href={'/dashboard'}
                        key={'dashboard'}
                        className={clsx(
                            'flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow hover:bg-sky-100 hover:text-blue-600',
                            {
                                'border-2 border-violet-700': '/dashboard' === pathname ,
                            }
                        )}
                    >
                        <img src="https://via.placeholder.com/40" alt="Home" className="w-10 h-10 rounded-full"/>

                    </Link>


                    {/* Numery pięter */}
                    {floorNumbers.map((number) => (
                        <Link
                            key={number}
                            href={`/dashboard/floor/${number}`}
                            className={clsx(
                                'relative flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold text-black bg-white shadow hover:bg-sky-100 hover:text-2xl',
                                {
                                    'border-2 border-violet-700': pathname === `/dashboard/floor/${number}`,
                                }
                            )}
                        >
                            {number}
                        </Link>
                    ))}

                    {/*{links.map((link) => (*/}
                    {/*    <Link*/}
                    {/*        key={link.name}*/}
                    {/*        href={link.href}*/}
                    {/*        className={clsx(*/}
                    {/*            'relative flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold text-black bg-white shadow hover:bg-sky-100 hover:text-2xl',*/}
                    {/*            {*/}
                    {/*                'border-2 border-purple-500': pathname === link.href,*/}
                    {/*            }*/}
                    {/*        )}*/}
                    {/*    >*/}
                    {/*        {link.name}*/}
                    {/*    </Link>*/}
                    {/*))}*/}
                </div>

                {/* Dolna sekcja */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Separator */}
                    <div className="w-full h-px bg-black"></div>

                    {/* Przycisk "+" */}
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg shadow">
                        <img src="https://via.placeholder.com/40" alt="Add floor" className="w-10 h-10 rounded-full"/>
                    </div>

                    {/* Przycisk ustawienia */}
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg shadow">
                        <img src="https://via.placeholder.com/40" alt="Settings Icon"
                             className="w-10 h-10 rounded-full"/>
                    </div>

                    {/* Avatar i podpis */}
                    <div className="flex flex-col items-center">
                        <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full"/>
                        <span className="text-sm mt-2 text-gray-700">User</span>
                    </div>
                </div>
            </div>

        </>
    );
}