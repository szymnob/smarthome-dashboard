import { useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import {
    getDevicesIdInRoom, 
    getRoomName, 
} from "@/app/dashboard/data/dataService";

import DeviceComponent from "@/components/views/device-views/DeviceComponent";

import AddNewDevice from "@/components/views/device-views/AddNewDevice"; 
import RemoveDevice from "@/components/views/device-views/RemoveDevice";
import SubmitButton from '@/components/ui/assets/Buttons';
import { Tooltip } from 'react-tooltip';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

export default function RoomComponent({floorId, roomId, isEditing}) {

    //Visibility of Add and Remove Device modals
    const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
    const [showRemoveDeviceModal, setShowRemoveDeviceModal] = useState(false);

    const { data, setData } = useContext(DataContext);

    const [roomName, setRoomName] = useState("")
    const [devicesId, setDevicesId] = useState([])

    useEffect(() => {
        if(data){
            setRoomName(getRoomName(data, floorId, roomId));
            setDevicesId(getDevicesIdInRoom(data, floorId, roomId));
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

    return (
      <div className="flex flex-col m-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center">{roomName}</h1>
        {/* Conditionally render UI in editing mode */}
        {isEditing && (
        <div className="flex space-x-2 items-center">
          <Tooltip anchorSelect="#addDevice" content="Add device" place="top" delayShow={250} />
          <SubmitButton
          id="addDevice"
          onClick={handleAddDeviceClick}
          label={<PlusIcon className="h-5 w-5" />}
          padding="p-1"
          />
          <Tooltip anchorSelect="#removeDevice" content="Remove device" place="top" delayShow={250} />
          <SubmitButton
          id="removeDevice"
          onClick={handleRemoveDeviceClick}
          label={<MinusIcon className="h-5 w-5" />}
          padding='p-1'
          />
        </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center bg-neutral-50 shadow-md border-custom rounded-lg mt-2 p-2 min-w-[250px] min-h-[150px]">
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
