'use client';

import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import DataContext from "@/app/dashboard/data/dataContext";
import { getFloorsNumbers, getActiveUserName, getActiveUserId } from "@/app/dashboard/data/dataService";
import LinkButtonImage, { ButtonImage, LinkButtonText } from "@/components/ui/navigation/NavigationButton";
import Link from 'next/link';
import { Tooltip } from 'react-tooltip'

export default function Navigation({ openModal }) {
    const pathname = usePathname();
    const [activeUserId, setActiveUserId] = useState(null);
    const [username, setActiveUserName] = useState("");
    const [floorNumbers, setFloorNumbers] = useState([]);

    const { data } = useContext(DataContext);

    useEffect(() => {
        const fetchData = async () => {
            if (data !== null && data !== undefined) {
                const userId = await getActiveUserId(data);
                if (userId !== null && userId !== undefined) {
                    setActiveUserId(userId);
                    setActiveUserName(await getActiveUserName(data));
                }
                const floors = getFloorsNumbers(data);
                setFloorNumbers(floors);
            }
        };
        fetchData();
    }, [data]);

    return (
        <>
            <div className="min-h-full bg-gray-300 flex flex-col justify-between p-3 items-center py-8">
                {/* Górna sekcja */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Dashboard */}
                    <LinkButtonImage
                        href={'/dashboard'}
                        icon="/icons/home.svg"
                        isActive={pathname === '/dashboard'}
                        label="Home"
                    />

                    {/* Separator */}
                    <div className="w-full h-px bg-black"></div>

                    {/* Numery pięter, faktycznie fetch'uje piętra */}
                    {floorNumbers.map((number) => (
                        <LinkButtonText
                            key={number}
                            href={`/dashboard/floor/${number}`}
                            text={number}
                            isActive={pathname === `/dashboard/floor/${number}`}
                        />
                    ))}

                    {/* Separator */}
                    <div className="w-full h-px bg-black"></div>

                    {/* Dashboard */}
                    <LinkButtonImage
                        href={'/dashboard/monitoring'}
                        icon="/icons/devices/camera.svg"
                        isActive={pathname === '/dashboard/monitoring'}
                        label="Monitoring"
                    />
                </div>

                {/* Dolna sekcja */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Separator */}
                    <div className="w-full h-px bg-black"></div>

                    {/* Przycisk "+" */}
                    <ButtonImage
                        icon="/icons/plus.svg"
                        onClick={openModal}
                        isActive={false}
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
                    <Tooltip anchorSelect="#avatar" content="Switch user" place="right" delayShow={500} />
                    <Link id="avatar" href='/' className="flex flex-col items-center space-y-2 group">
                        <img src={`/icons/avatars/${activeUserId || 'default'}.png`} alt={`${activeUserId || 'default'}.png`} className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-200"/>
                        <span className="text-sm mt-2 text-gray-700 group-hover:font-bold">{username || 'User'}</span>
                    </Link>
                </div>
            </div>
        </>
    );
}