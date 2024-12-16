

import Input from "@/components/ui/assets/Input";
import {useState} from "react";
import SubmitButton, {CancelButton} from "@/components/ui/assets/Buttons";
import {useRouter} from "next/navigation";


export default function LoginComponent() {

    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleUserNameChange = (e) => {
        setUserName(prevState => {
            return e.target.value;
        });
    }

    const handlePasswordChange = (e) => {
        setPassword(prevState => {
            return e.target.value;
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        router.push("/dashboard");
    }

    return(
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 bg-opacity-30 backdrop-blur-lg rounded-lg ">

            <form onSubmit={handleSubmit} className="space-y-5">

                <Input id={userName} type="text" label={"Name:"} value={userName} onChange={handleUserNameChange}/>
                <Input id={password} type="text" label={"Password:"} value={password} onChange={handlePasswordChange}/>

                <div className="flex flex-row justify-between space-x-5 p-2">
                    <SubmitButton label="Login"/>
                </div>
            </form>
        </div>
    )
}