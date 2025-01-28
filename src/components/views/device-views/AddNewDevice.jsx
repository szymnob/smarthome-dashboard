
//Dodane całość pliku

// AddNewDevice.jsx
import ModalWindow from "@/components/ui/assets/modals/ModalWindow";
import { useContext, useState } from "react";
import DataContext from "@/app/dashboard/data/dataContext";
import { addDeviceToRoom } from "@/app/dashboard/data/dataService";
import Input from "@/components/ui/assets/Input";
import SubmitButton, { CancelButton } from "@/components/ui/assets/Buttons";
import PropTypes from "prop-types";
import Select from "@/components/ui/assets/Select";

AddNewDevice.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  floorId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired   // or number
};

export default function AddNewDevice({ isVisible, onClose, floorId, roomId }) {
  const { data, setData } = useContext(DataContext);

  // Local form states
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("rgb_light"); // default type
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (deviceName.trim().length < 2) {
      setError("Device name is too short.");
      return;
    }

    // Actually add the device
    addDeviceToRoom(data, setData, floorId, roomId, deviceName, deviceType);

    // Reset fields & close
    setDeviceName("");
    setDeviceType("rgb_light");
    setError("");
    onClose();
  };

  return (
    <ModalWindow isVisible={isVisible} onClose={onClose} title="Add new device">
      <div className="m-5">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Device Name */}
          <Input
            id="deviceName"
            label="Device name:"
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            error={error}
          />

          {/* Device Type (example: select dropdown) */}
          <div>
            <Select label="Device type:" value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
              <option value="rgb_light">RGB Light</option>
              <option value="light">Light</option>
              <option value="heater">Heater</option>
              <option value="tv">TV</option>
              <option value="air_conditioner">Air Conditioner</option>
              <option value="refrigerator">Refrigerator</option>
              <option value="refrigerator">Blinders</option>
              {/* ... można dodać więcej opcji */}
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
            <SubmitButton label="Add" />
          </div>

        </form>
      </div>
    </ModalWindow>
  );
}






// export default function RoomComponent({ floorId, roomId, isEditing }) {
//   const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);

//   // ...

//   return (
//     <div>
//       {/* The editing buttons */}
//       {isEditing && (
//         <div className="my-2 flex space-x-2">
//           <button
//             className="px-3 py-1 bg-green-500 text-white rounded"
//             onClick={() => setShowAddDeviceModal(true)}
//           >
//             + Add Device
//           </button>
//           {/* ...some remove code if you want */}
//         </div>
//       )}

//       {/* Existing devices in the room */}
//       <div>{/* ... render each DeviceComponent */}</div>

//       {/* The Add Device modal */}
//       <AddNewDevice
//         isVisible={showAddDeviceModal}
//         onClose={() => setShowAddDeviceModal(false)}
//         floorId={floorId}
//         roomId={roomId}
//       />
//     </div>
//   );
// }
//Dodane całość pliku