import Switch from "@/components/ui/assets/Switch";
import {useEffect, useState} from "react";
import {
    changeScheduleActive,
    getDeviceSchedule,
    updateDeviceState,
    updateScheduleById
} from "@/app/dashboard/data/dataService";

export default function Schedule({data, deviceId}){

    const [schedules, setSchedules] = useState({})
    useEffect(() => {
        if(data){
            setSchedules(getDeviceSchedule(data, deviceId));
            console.log(getDeviceSchedule(data, deviceId))
        }
    }, []);


    function updateSchedule(scheduleId, updatedData) {
        setSchedules((prev) => {
            if(!scheduleId){
                return prev;
            }
            const updatedSchedule = {...prev};
            //jesli usuwa przekazuje null
            if(updatedData === null){
                delete updatedSchedule[scheduleId];
                updateScheduleById(data, deviceId, scheduleId, null);
            }
            else{
                const newSchedule = {
                    ...prev[scheduleId],
                    ...updatedData
                };
                console.log("newSchedule", newSchedule)
                updateScheduleById(data, deviceId, scheduleId, newSchedule);
                return {
                    ...prev,
                    [scheduleId]: newSchedule
                };
            }
            return updatedSchedule;
        });
    }

    function addNewSchedule() {
        const newScheduleId = Date.now().toString(); // Unikalne ID dla nowego harmonogramu
        const newSchedule = {
            active: false,
            start: "",
            end: "",
            days: [],
        };

        updateSchedule(newScheduleId, newSchedule);

        console.log(`New schedule ${newScheduleId} added.`);
    }



    return(
        <div className="space-y-2">
            <div className='flex flex-row space-x-2 items-center'>
                <h1 className="font-medium">Schedule</h1>
                <div className="w-5 h-auto cursor-pointer rounded-md hover:bg-neutral-200 hover:scale-105 "
                     onClick={addNewSchedule}>
                    <img className="w-full h-auto" src="/icons/plus.svg" alt="Close"/>
                </div>
            </div>

            {schedules && Object.keys(schedules).map((scheduleId) => (
                <ScheduleElement
                    key={scheduleId}
                    scheduleId={scheduleId}
                    scheduleData={schedules[scheduleId]}
                    data={schedules[scheduleId]}
                    deviceId={deviceId}
                    updateSchedule={updateSchedule}
                />
            ))}


        </div>
    )
}


function ScheduleElement({ deviceId, scheduleId, updateSchedule, scheduleData, removeSchedule}) {

    const daysOfWeek = [{name: "Monday", id: 1}, {name: "Tuesday", id: 2}, {
        name: "Wednesday", id: 3}, {name: "Thursday", id: 4}, {name: "Friday", id:5}, {name: "Saturday", id:6}, {name: "Sunday", id:7}]
    const [selectedDays, setSelectedDays] = useState([])
    const [startTime, setStartTime] = useState(scheduleData?.startTime || "")
    const [endTime, setEndTime] = useState(scheduleData?.endTime || "")
    const [active, setActive] = useState(scheduleData?.active || false);

    const handleChangeActive = () => {
        const newStatus = !active;
        setActive(newStatus);
        updateSchedule(scheduleId, { active: newStatus });
    };

    const handleChangeStartTime = (e) => {
            const newTime = e.target.value;
            setStartTime(newTime);
            updateSchedule(scheduleId, {startTime: newTime});
    }

    const handleChangeEndTime = (e) => {
            const newTime = e.target.value;
            setEndTime(newTime);
            updateSchedule(scheduleId, {endTime: newTime});
    }





    return(
        <div className="flex flex-row border-custom rounded-lg p-2 space-x-2">
            <div className="flex flex-col justify-between items-center">
                <Switch size="small" checked={active} onChange={handleChangeActive}/>
                <div onClick={()=> updateSchedule(scheduleId, null)} className="w-7 h-auto cursor-pointer rounded-md hover:bg-neutral-200 hover:scale-105 ">
                    <img  src="/icons/trash.svg"/>
                </div>
            </div>
            <label htmlFor="start-time"  className="flex flex-col">
                <p>Start:</p>
                <input className="input-custom" id="start-time" type="time" value={startTime} onChange={(e)=>handleChangeStartTime(e)}></input>
            </label>

            <label htmlFor="end-time" className="flex flex-col">
                <p>End:</p>
                <input className="input-custom" id="end-time" type="time" value={endTime} onChange={(e)=>handleChangeEndTime(e)}></input>
            </label>


        </div>

    )
}