import { useEffect, useContext, useState } from 'react';
import { getActiveUserName, getActiveUserId, getActiveUserAvatar } from "@/app/dashboard/data/dataService";
import DataContext from "@/app/dashboard/data/dataContext";


export default function WelcomeMessage() {
    const [activeUserId, setActiveUserId] = useState(null);
    const [username, setActiveUserName] = useState("");
    const [avatar, setActiveUserAvatar] = useState("");

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
            }
        };
        fetchData();
    }, [data]);
        
    return (
        <div className="flex flex-col items-center justify-center mt-5 p-6 bg-white m-4 max-w-md mx-auto text-center">
            <img src={`${avatar || '/icons/avatars/default.png'}`} alt={`${avatar || 'default'}`} className="w-32 h-32 rounded-full border-4 border-gray-300 mt-4"/>
            <h1 className="text-4xl font-bold mt-2 text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">Welcome {username || 'User'}!</h1>
            <h4 className="text-lg text-gray-600">This is your personal dashboard page.</h4>
        </div>
    );
}
