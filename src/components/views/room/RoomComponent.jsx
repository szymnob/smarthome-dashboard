import { useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import {
    getDevicesIdInRoom, 
    getRoomName, 
    // /*Dodane*/addDeviceToRoom, 
    // removeDeviceFromRoom /*Dodane*/
} from "@/app/dashboard/data/dataService";

import DeviceComponent from "@/components/views/device-views/DeviceComponent";

//Dodane
//removing adding devices
import AddNewDevice from "@/components/views/device-views/AddNewDevice"; 
import RemoveDevice from "@/components/views/device-views/RemoveDevice";
import SubmitButton from '@/components/ui/assets/Buttons';
//Dodane

export default function RoomComponent({floorId, roomId, /*Dodane*/ isEditing}) {
    //kontrola widzialności AddNewDevice
    /*Dodane*/ const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
    /*Dodane*/ const [showRemoveDeviceModal, setShowRemoveDeviceModal] = useState(false);
    //const { data } = useContext(DataContext);
    /*Dodane*/ const { data, setData } = useContext(DataContext);

    const [roomName, setRoomName] = useState("")

    const [devicesId, setDevicesId] = useState([])


    useEffect(() => {
        if(data){
            setRoomName(getRoomName(data, floorId, roomId));
            setDevicesId(getDevicesIdInRoom(data, floorId, roomId));
            //check
            // console.log('Devices in Room:', getDevicesIdInRoom(data, floorId, roomId));
            // console.log('All Devices:', data.devices);
        }
    }, [data, floorId, roomId]);

    

    // Handler to open Remove Device modal and log the action
    const handleRemoveDeviceClick = () => {
      console.log(`Remove device in room ${roomId}`);
      setShowRemoveDeviceModal(true);
  };

    const handleAddDeviceClick = () => {
      console.log(`Add device in room ${roomId}`);
      setShowAddDeviceModal(true);
    };


  

    //Dodane przedostania
    return (
      <div className="flex flex-col m-8">
      <div className="m5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center">{roomName}</h1>
        {/* Conditionally render UI in editing mode */}
        {isEditing && (
        <div className="flex space-x-2 items-center">
          <SubmitButton
          onClick={handleAddDeviceClick}
          label="+"
          width="w-9"
          height="h-9"
          padding="p-0"
          />
          <SubmitButton
          onClick={handleRemoveDeviceClick}
          label="-"
          width="w-9"
          height="w-9"
          padding='p-0'
          />
        </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center bg-neutral-50 shadow-md border-custom rounded-lg mt-2 p-2 min-w-[250px]">
        {devicesId.map((deviceId) => (
        <DeviceComponent key={deviceId} deviceId={deviceId} />
        ))}
      </div>

      {/* The Add Device modal */}
      <AddNewDevice
      isVisible={showAddDeviceModal}
      onClose={() => setShowAddDeviceModal(false)}
      floorId={floorId}
      roomId={roomId}
      />

      {/* The Remove Device modal */}
      <RemoveDevice
      isVisible={showRemoveDeviceModal}
      onClose={() => setShowRemoveDeviceModal(false)}
      floorId={floorId}
      roomId={roomId}
      />
      </div>
    );
    
}
    //Dodane

    // return (
    //         <div className="flex flex-col m-8">
    //             <div className="m5 ">
    //                 <h1 className="text-2xl text-bold text-center">{roomName}</h1>
    //             </div>
    //             <div className="flex flex-wrap bg-neutral-50 shadow-md border-custom rounded-lg mt-2 p-2  ">
    //                     {devicesId.map((deviceId) => (
    //                         <DeviceComponent key={deviceId} deviceId={deviceId}/>
    //                     ))}
    //             </div>
    //         </div>

    // );
