import React, { useEffect, useContext, useState, useRef } from 'react';
import SubmitButton from "@/components/ui/assets/Buttons";
import { getActiveUserName, getActiveUserId, getActiveUserAvatar, changeActiveUserName, changeActiveUserAvatar } from "@/app/dashboard/data/dataService";
import DataContext from "@/app/dashboard/data/dataContext";
import Input from "@/components/ui/assets/Input";
import LinkButtonImage from "@/components/ui/navigation/NavigationButton";

const ProfileSettings = () => {
    const [activeUserId, setActiveUserId] = useState(null);
    const [username, setActiveUserName] = useState("");
    const [avatar, setActiveUserAvatar] = useState("");
    const { data, setData } = useContext(DataContext);
    const avatarOptionsRef = useRef(null);
    const avatarButtonRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (data !== null && data !== undefined) {
                const userId = await getActiveUserId(data);
                if (userId !== null && userId !== undefined) {
                    setActiveUserId(userId);
                    setActiveUserName(await getActiveUserName(data));
                    setActiveUserAvatar(await getActiveUserAvatar(data));
                }
            }
        };
        fetchData();
    }, [data]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                avatarOptionsRef.current && !avatarOptionsRef.current.contains(event.target) &&
                avatarButtonRef.current && !avatarButtonRef.current.contains(event.target)
            ) {
                setShowAvatarOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const availableAvatars = ['default', '1', '2', '3', '4'];
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);

    const handleChangeAvatar = (avatar) => {
        const avatarString = availableAvatars[avatar];

        changeActiveUserAvatar(data, `/icons/avatars/${avatarString}.png`);
        setData({ ...data });

        setShowAvatarOptions(false);
    };

    const handleChangeUsername = (username) => {
        changeActiveUserName(data, username);
        setData({ ...data });
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl text-black-600 font-semibold">Profile Settings</h2>
            <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Change Username</h3>
                <div className="mb-4">
                    <Input id="username" label="Username:" type="text" placeholder="Enter new username" value={username} onChange={(e) => setActiveUserName(e.target.value)} />
                </div>
                <div className="mb-4 flex justify-end">
                        <SubmitButton label="Save Username" padding="p-2" onClick={() => {
                            handleChangeUsername(username);
                        }}/>
                </div>
            </div>
            <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Change Avatar</h3>
                <div className="relative group mb-4 flex justify-center">
                    <button ref={avatarButtonRef} className="relative rounded-full overflow-hidden" onClick={(e) => { e.stopPropagation(); setShowAvatarOptions(!showAvatarOptions); }}>
                        <img src={`${avatar || '/icons/avatars/default.png'}`} alt={`${avatar || 'default'}`} className="w-20 h-20 rounded-full transition-transform duration-200 group-hover:scale-110"/>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                            <span className="text-white font-semibold">Edit</span>
                        </div>
                    </button>
                    {showAvatarOptions && (
                        <div ref={avatarOptionsRef} className="absolute top-full mt-2 grid grid-cols-4 gap-4 bg-white p-2 rounded shadow-lg">
                            {availableAvatars.map((avatar, index) => (
                                <img key={index} src={`/icons/avatars/${avatar}.png`} alt={`${avatar}.png`} className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
                                 onClick={() => handleChangeAvatar(index)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <hr className="my-6"/>
            
            <div className="flex justify-end items-center">
                <h1 className="text-lg font-bold text-black-500 mr-2">Logout</h1>
                <LinkButtonImage
                    href={'/'}
                    icon="/icons/logout.svg"
                    label="Logout"
                />
            </div>
        </div>
    );
};

export default ProfileSettings;
