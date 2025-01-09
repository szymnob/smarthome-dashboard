

//import Input from "@/components/ui/assets/Input";
//import SubmitButton from "@/components/ui/assets/Buttons";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { getAllProfiles, setActiveUserId } from "@/app/dashboard/data/dataService";

import DataContext from "@/app/dashboard/data/dataContext";

// export default function LoginComponent() {

//     const router = useRouter();

//     const [userName, setUserName] = useState("");
//     const [password, setPassword] = useState("");

//     const handleUserNameChange = (e) => {
//         setUserName(prevState => {
//             return e.target.value;
//         });
//     }

//     const handlePasswordChange = (e) => {
//         setPassword(prevState => {
//             return e.target.value;
//         });
//     }

//     const handleSubmit = (e) =>{
//         e.preventDefault()

//         router.push("/dashboard");
//     }

//     return(
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg ">

//             <form onSubmit={handleSubmit} className="space-y-5">

//                 <Input id={userName} labelColor="white" type="text" label={"Name:"} value={userName} onChange={handleUserNameChange}/>
//                 <Input id={password} type="text" labelColor="white" label={"Password:"} value={password} onChange={handlePasswordChange}/>

//                 <div className="flex flex-row justify-between space-x-5 p-2">
//                     <SubmitButton label="Login"/>
//                 </div>
//             </form>
//         </div>
//     )
// }

export default function LoginComponent() {
    const router = useRouter();
    const { data, setData } = useContext(DataContext);

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        if (data) {
            setProfiles(Object.values(data.profiles));
        }
    }, [data]);

    const handleProfileClick = (key) => {
        setData((prevData) => ({
            ...prevData,
            activeUserId: key,
        }));
        router.push("/dashboard");
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 md:p-12 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
            <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Smart Home</h1>
            </div>
            <div className="space-x-6 flex flex-wrap justify-center items-center">
            {Object.keys(profiles).map((key) => (
            <div
            key={key}
            className="flex flex-col items-center space-y-2 cursor-pointer m-2 transition-transform transform hover:scale-105"
            onClick={() => handleProfileClick(parseInt(key) + 1)} // parseInt to convert key to integer, +1 to match the profile ID
            >
            <img
                src={profiles[key].avatar}
                alt={profiles[key].name}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full"
            />
            <span className="text-white text-sm md:text-base">{profiles[key].name}</span>
            </div>
            ))}
            </div>
        </div>
        );
}