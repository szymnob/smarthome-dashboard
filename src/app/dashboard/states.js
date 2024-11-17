import {useState} from "react";

export default function EditData(){
    const[data, setData] = useState({data})
}

export async function loadData(){
    const filePath = '/public/home.json';
    const jsonData = await fetch(filePath);
    return await jsonData.json();
}