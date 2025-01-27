// src/components/views/device-views/RemoveDevice.jsx
import ModalWindow from "@/components/ui/assets/modals/ModalWindow";
import { useContext, useState } from "react";
import DataContext from "@/app/dashboard/data/dataContext";
import {deleteDeviceById, removeDeviceFromRoom} from "@/app/dashboard/data/dataService";
// import Input from "@/components/ui/assets/Input";
import SubmitButton, { CancelButton } from "@/components/ui/assets/Buttons";
import PropTypes from "prop-types";
import Select from "@/components/ui/assets/Select";

RemoveDevice.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  floorId: PropTypes.string.isRequired, // or number if that’s how you store it
  roomId: PropTypes.string.isRequired,  // or number
};

export default function RemoveDevice({ isVisible, onClose, floorId, roomId }) {
  const { data, setData } = useContext(DataContext);

  // Local form state
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [error, setError] = useState("");

  // Get devices in the room
  const devicesInRoom = data?.home?.floors?.[floorId]?.rooms?.[roomId]?.devices || [];

  // Function to handle device selection
  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value); //<------------------ może to wina braku setSelectedDeviceId(String(e.target.value));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure a device is selected
    if (!selectedDeviceId) {
      setError("Please select a device to remove.");
      return;
    }

    // console.log(`Selected Device ID: ${selectedDeviceId}`);
    // console.log(`Device Exists:`, data.devices[selectedDeviceId]);
    // Proceed to remove the device
    //removeDeviceFromRoom(data, setData, floorId, roomId, selectedDeviceId);
    deleteDeviceById(setData, parseInt(selectedDeviceId))
    //deleteDeviceById_test(data, setData, selectedDeviceId);
      console.log(data)
       

    // Reset fields & close modal
    setSelectedDeviceId("");
    setError("");
    onClose();
  };

  return (
    <ModalWindow isVisible={isVisible} onClose={onClose} title="Remove Device">
      <div className="m-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Device Selection */}
          <div>

            <Select  label="Select device:" value={selectedDeviceId} onChange={handleDeviceChange}>
              <option value="">-- Select a Device --</option>
              {devicesInRoom.map((deviceId) => (
                  <option key={deviceId} value={deviceId}>
                    {data.devices[deviceId]?.name || `Device ${deviceId}`}
                  </option>
              ))}
            </Select>

          </div>

          {/* Optional error message */}
          {error && (
            <div className="w-full text-center bg-red-400 shadow-md shadow-red-300 rounded-lg leading-loose">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-row justify-between space-x-5 p-2">
            <CancelButton onClick={onClose} />
            <SubmitButton label="Remove" /*type="submit"*//>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
}


// function deleteDeviceById_test(data, setData, deviceId) {
//     const updatedData = { ...data };

//     if (updatedData.devices && updatedData.devices[deviceId]) {
//         delete updatedData.devices[deviceId];
//     }


    
//     if (updatedData.devices[deviceId]) {
//         delete updatedData.devices[deviceId];
//         console.log(`Device ID: ${deviceId} removed from devices`);
//     } else {
//         console.warn(`Device ID: ${deviceId} does not exist in devices`);
//     }


//     setData(updatedData);
// }
