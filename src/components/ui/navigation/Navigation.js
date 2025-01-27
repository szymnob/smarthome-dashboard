'use client';

import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import DataContext from "@/app/dashboard/data/dataContext";
import { getFloorsNumbers, getActiveUserName, getActiveUserId, getActiveUserAvatar } from "@/app/dashboard/data/dataService";
import LinkButtonImage, { ButtonImage, LinkButtonText } from "@/components/ui/navigation/NavigationButton";
import Link from 'next/link';
import { Tooltip } from 'react-tooltip'

export default function Navigation({ openModal }) {
    const pathname = usePathname();
    const [activeUserId, setActiveUserId] = useState(null);
    const [avatar, setActiveUserAvatar] = useState("");
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
                    setActiveUserAvatar(await getActiveUserAvatar(data));
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
                            tooltip={`Floor ${number}`}
                        />
                    ))}
        

                    {/* Separator */}
                    <div className="w-full h-px bg-black"></div>

                    {/* Add floor*/}
                    <ButtonImage
                        icon="/icons/plus.svg"
                        onClick={openModal}
                        isActive={false}
                        label="Add floor"
                    />

                </div>

                {/* Dolna sekcja */}
                 <div className="flex flex-col items-center space-y-4 mt-4">
                    {/* Separator */}
                    <div className="w-full h-px bg-black"></div>

                    {/* Monitoring */}
                    <LinkButtonImage
                        href={'/dashboard/monitoring'}
                        icon="/icons/devices/camera.svg"
                        isActive={pathname === '/dashboard/monitoring'}
                        label="Monitoring"
                    />
                    

                    {/* Avatar */}
                    <Tooltip anchorSelect="#avatar" content="Switch user" place="right" delayShow={500} />
                    <Link id="avatar" href='/dashboard/settings' className="flex flex-col items-center space-y-2 group">
                        <img src={`${avatar || '/icons/avatars/default.png'}`} alt={`${avatar || 'default'}`} className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-200"/>
                        <span className="text-sm mt-2 text-gray-700 group-hover:font-bold">{username || 'User'}</span>
                    </Link>
                </div>
            </div>
        </>
    );
}