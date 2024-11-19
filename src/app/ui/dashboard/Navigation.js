'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from "clsx";

import {useContext, useEffect, useState} from "react";
import DataContext from "@/app/dashboard/dataContext";

import {getFloorsNumbers, getUserName} from "@/app/dashboard/dataService";
import ModalWindow from "@/components/control-overlays/ModalWindow";
import AddNewFloor from "@/components/control-overlays/AddNewFloor";
import LinkButtonImage, {ButtonImage, LinkButtonText} from "@/app/ui/dashboard/NavigationButton";

const links = [
    { name: '1', href: '/dashboard/floor-1', icon: 'https://via.placeholder.com/40' },
    { name: '2', href: '/floor/2', icon: 'https://via.placeholder.com/40' },
    { name: '3', href: '/floor/3', icon: 'https://via.placeholder.com/40' },
];



export default function Navigation() {
    const pathname = usePathname();
    const[showAddFloorModal, setShowAddFloorModal] = useState(false);

    const[username, setUsername] = useState("User");
    const[floorNumbers, setFloorNumbers] = useState([]);


    const { data } = useContext(DataContext);

    useEffect(() => {
        if (data) {
            setUsername(getUserName(data));
            setFloorNumbers(getFloorsNumbers(data));
        }
    }, [data]);


    const openModal = () => setShowAddFloorModal(true);
    const closeModal = () => setShowAddFloorModal(false);


    return (
        <>
            <div className="h-screen bg-gray-300 flex flex-col justify-between p-3 items-center py-8">
                {/* Górna sekcja */}
                <div className="flex flex-col items-center space-y-7">

                    <LinkButtonImage
                        href={'/dashboard'}
                        icon="/icons/home.svg"
                        isActive={pathname === '/dashboard'}
                        label="Home"
                    />

                    {/* Numery pięter */}
                    {floorNumbers.map((number) => (
                        <LinkButtonText
                            key={number}
                            href={`/dashboard/floor/${number}`}
                            text={number}
                            isActive={pathname === `/dashboard/floor/${number}`}
                        />
                    ))}

                </div>

                {/* Dolna sekcja */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Separator */}
                    <div className="w-full h-px bg-black"></div>

                    {/* Przycisk "+" */}
                    <ButtonImage
                        icon="/icons/plus.svg"
                        onClick={openModal}
                        isActive={showAddFloorModal}
                        label="Add floor"
                    />

                    {/* Przycisk ustawienia */}
                    <LinkButtonImage
                        href={'/dashboard/settings'}
                        icon="/icons/settings.svg"
                        isActive={pathname === '/dashboard/settings'}
                        label="Settings"
                    />


                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                        <img src="/icons/user.svg" alt="Avatar" className="w-10 h-10 rounded-full"/>
                        <span className="text-sm mt-2 text-gray-700">{username}</span>
                    </div>
                </div>
            </div>

            {/*<AddNewFloor isVisible={showAddFloorModal} onClose={closeModal}/>*/}

            <ModalWindow isVisible={showAddFloorModal} onClose={closeModal} title="Add new floor">
                <AddNewFloor onClose={closeModal}/>
            </ModalWindow>

        </>
    );
}