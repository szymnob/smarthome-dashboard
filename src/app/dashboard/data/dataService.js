import { set } from "lodash";

export function getFloorsNumbers(data){
    return Object.keys(data.home.floors).map(floorId => floorId);
}

export default function getRooms(data, floorId){
    return data.home.floors[floorId].rooms;
}

export function getRoomName(data, floorId, roomId){
    return data.home.floors[floorId].rooms[roomId]?.name;
}

// export function getRoomName(data, floorId, roomId){
//     console.log('Fetching room name for:', { floorId, roomId });
    
//     // Use a replacer function to omit 'devices' properties
//     const dataWithoutDevices = JSON.stringify(data, (key, value) => {
//         if (key === 'devices') {
//             return undefined; // Omit the 'devices' property
//         }
//         return value; // Retain all other properties
//     }, 2); // Pretty-print with 2-space indentation
    
//     console.log('Current data (devices excluded):', dataWithoutDevices);
    
//     return data?.home?.floors?.[floorId]?.rooms?.[roomId]?.name || 'Unknown Room';
// }

export function getDevicesIdInRoom(data, floorId, roomId){
    return data.home.floors[floorId].rooms[roomId]?.devices;
}


export function getDeviceNameById(data, deviceId) {
    const device = data.devices[deviceId];

    if (device) {
        return device.name;
    }
    return null;
}

export function getDeviceStateById(data, deviceId) {
    const deviceState = data.devices[deviceId].state;

    if (deviceState) {
        return deviceState;
    }
    return null;
}

export function deviceExists(data, deviceId) {
    return data?.devices?.hasOwnProperty(deviceId) ?? false;
}

export function getDeviceName(data, floorId, roomId, deviceId){
    return data.home.floors[floorId].rooms[roomId].devices[deviceId].name;
}

export function getRoomsIdOnFloor(data, floorId){
    return Object.keys(data.home.floors[floorId].rooms).map(roomId => roomId);
}
export function getDeviceTypeById(data, deviceId){
    return data.devices[deviceId].type;
}

export function getAllProfiles(data){
    return data.profiles;
}

export function getActiveUserId(data){
    return data.activeUserId;
}

export function getActiveUserProfile(data){
    return data.profiles[data.activeUserId];
}

export function setActiveUserId(data, userId){
    data.activeUserId = userId;
}

export function getActiveUserName(data){
    return getActiveUserProfile(data).name;
}

export function changeActiveUserName(data, newName){
    getActiveUserProfile(data).name = newName;
}

export function getActiveUserAvatar(data){
    return getActiveUserProfile(data).avatar;
}

export function changeActiveUserAvatar(data, newAvatar){
    console.log('Changing user avatar to:', newAvatar);
    console.log('Current data:', data);
    getActiveUserProfile(data).avatar = newAvatar;
}

export function updateDeviceState(data, deviceId, newState) {
    data.devices[deviceId].state.status = newState;
}

export function addFloor(data, setData, floorId, name){
    setData((prevData) => {
        const updatedData = { ...prevData };

        if (!updatedData.home.floors) {
            updatedData.home.floors = {};
        }

        if (!updatedData.home.floors[floorId]) {
            updatedData.home.floors[floorId] = {
                name: name,
                rooms: {}
            };
        }

        return updatedData;
    });
}

export function getDevicePropertiesById(data, deviceId){
    return data.devices[deviceId].state.properties;
}

export function saveDeviceProperties(data, deviceId, properties){
    data.devices[deviceId].state.properties = properties;
}

export function getDeviceSchedule(data, deviceId) {
    const device = data.devices[deviceId];
    if (device && device.schedule) {
        return device.schedule;
    }
    return null;
}

export function changeScheduleActive(data, deviceId, scheduleId, isActive) {
    data.devices[deviceId].schedule[scheduleId].active = isActive;
}

export function changeScheduleStartTime(data, deviceId, scheduleId, newStartTime) {
    data.devices[deviceId].schedule[scheduleId].startTime = newStartTime;
}

//do poprawy
export function updateScheduleById(data, deviceId, scheduleId, newSchedule) {
    if (!data || !data.devices || !data.devices[deviceId]) {
        console.error("Invalid data structure or deviceId:", data, deviceId);
        return;
    }

    if (newSchedule === null) {
        //jesli tak to usuwa harmonorgam o danym id
        if (data.devices[deviceId].schedule && data.devices[deviceId].schedule[scheduleId]) {
            delete data.devices[deviceId].schedule[scheduleId];
        }
    } else {
        //jesli nie istenieje schedule id to dodaje nowy harmonogram
        if (!data.devices[deviceId].schedule) {
            data.devices[deviceId].schedule = {};
        }

        data.devices[deviceId].schedule[scheduleId] = newSchedule;
    }

}

export function getFavourites(data) {
    return getActiveUserProfile(data).favourites
}

export function changeFavouriteStatus(data, deviceId, isFavourite) {
    const profiles = getActiveUserProfile(data);

    if (isFavourite) {
        profiles.favourites.push(deviceId);
    } else if (profiles.favourites.includes(deviceId)) {
        profiles.favourites = profiles.favourites.filter((id) => id !== deviceId);
    }
    
    return data;
}

export function deleteDeviceById(setData, deviceId) {
    setData(data => {
        const updatedData = { ...data };

        if (updatedData.devices && updatedData.devices[deviceId]) {
            delete updatedData.devices[deviceId];
        }

        // usuwanie urządzenie z ulubionych wszystkich użytkowników
        if (updatedData.profiles) {
            Object.keys(updatedData.profiles).forEach((userId) => {
                const user = updatedData.profiles[userId];
                if (user.favourites) {
                    user.favourites = user.favourites.filter((favId) => favId !== deviceId);
                }
            });
        }

        if (updatedData.home && updatedData.home.floors) {
            Object.keys(updatedData.home.floors).forEach((floorId) => {
                const floor = updatedData.home.floors[floorId];
                if (floor && floor.rooms) {
                    Object.keys(floor.rooms).forEach((roomId) => {
                        const room = floor.rooms[roomId];
                        if (room && room.devices) {
                            // Usuń urządzenie z listy urządzeń w pokoju
                            room.devices = room.devices.filter((id) => id !== deviceId);
                        }
                    });
                }
            });
        }

        return updatedData;
    });
}

export function changeDeviceName(setData, deviceId, newName) {
    // data.devices[deviceId].name = newName;
    setData(prev =>{
        const updatedData = { ...prev };
        updatedData.devices[deviceId].name = newName;
        return updatedData;
    })
}



//Dodane
// export function addDeviceToRoom(data, setData, floorId, roomId, deviceName, deviceType) {
//     setData(prevData => {
//         // Make a shallow copy so we don’t mutate prevData directly
//         const updatedData = { ...prevData };

//         // Generate a new numeric device ID
//         // (You could also find the max existing ID + 1, or use a unique library)
//         const newDeviceId = Date.now();  

//         // Create a new device object
//         updatedData.devices[newDeviceId] = {
//             id: newDeviceId,
//             name: deviceName,
//             type: deviceType,
//             brand: "",
//             model: "",
//             state: {
//                 status: "OFF",
//                 properties: {}
//             }
//         };

//         // Push the new device ID into this room’s devices array
//         updatedData.home.floors[floorId].rooms[roomId].devices.push(newDeviceId);

//         return updatedData;
//     });
// }


// dataService.js
export function addDeviceToRoom(data, setData, floorId, roomId, deviceName, deviceType) {
    setData(prevData => {
        // Deep copy the relevant parts of the state to maintain immutability
        const updatedData = {
            ...prevData,
            devices: {
                ...prevData.devices,
                // New device will be added here
            },
            home: {
                ...prevData.home,
                floors: {
                    ...prevData.home.floors,
                    [floorId]: {
                        ...prevData.home.floors[floorId],
                        rooms: {
                            ...prevData.home.floors[floorId].rooms,
                            [roomId]: {
                                ...prevData.home.floors[floorId].rooms[roomId],
                                devices: [
                                    ...prevData.home.floors[floorId].rooms[roomId].devices
                                ]
                            }
                        }
                    }
                }
            }
        };

        // Generate a new unique device ID
        const newDeviceId = Date.now(); // Consider using a UUID for better uniqueness

        // Add the new device to the devices object
        updatedData.devices[newDeviceId] = {
            id: newDeviceId,
            name: deviceName,
            type: deviceType,
            brand: "",
            model: "",
            state: {
                status: "OFF",
                properties: {}
            }
        };

        // Add the new device ID to the room's devices array
        updatedData.home.floors[floorId].rooms[roomId].devices.push(newDeviceId);

        return updatedData;
    });
}



//nie działa i nie wiem dlaczego

// export function removeDeviceFromRoom(data, setData, floorId, roomId, deviceId) {
//     console.log(`Removing device ID: ${deviceId} from room ${roomId} on floor ${floorId}`);
//     setData(prevData => {
//         // Deep copy the relevant parts to maintain immutability
//         const updatedData = {
//             ...prevData,
//             devices: { ...prevData.devices },
//             home: {
//                 ...prevData.home,
//                 floors: {
//                     ...prevData.home.floors,
//                     [floorId]: {
//                         ...prevData.home.floors[floorId],
//                         rooms: {
//                             ...prevData.home.floors[floorId].rooms,
//                             [roomId]: {
//                                 ...prevData.home.floors[floorId].rooms[roomId],
//                                 devices: prevData.home.floors[floorId].rooms[roomId].devices.filter(id => id !== deviceId)
//                             }
//                         }
//                     }
//                 }
//             }
//         };

//         // Remove the device from the global devices object
//         if (updatedData.devices[deviceId]) {
//             delete updatedData.devices[deviceId];
//             console.log(`Device ID: ${deviceId} removed from devices`);
//         } else {
//             console.warn(`Device ID: ${deviceId} does not exist in devices`);
//         }

//         return updatedData;
//     });
// }

export function removeDeviceFromRoom(data, setData, floorId, roomId, deviceId) {
    const updatedData = { ...data };
  
    // Remove device from devices
    if (updatedData.devices && updatedData.devices[deviceId]) {
      delete updatedData.devices[deviceId];
      console.log(`Device ID: ${deviceId} removed from devices`);
    } else {
      console.warn(`Device ID: ${deviceId} does not exist in devices`);
    }
  
    // Remove device from room's device list
    if (
      updatedData.home &&
      updatedData.home.floors &&
      updatedData.home.floors[floorId] &&
      updatedData.home.floors[floorId].rooms &&
      updatedData.home.floors[floorId].rooms[roomId] &&
      updatedData.home.floors[floorId].rooms[roomId].devices
    ) {
      updatedData.home.floors[floorId].rooms[roomId].devices = updatedData.home.floors[floorId].rooms[roomId].devices.filter(
        (id) => id !== deviceId
      );
      console.log(`Device ID: ${deviceId} removed from room ${roomId}`);
    }
  
    return updatedData;
  }
//Dodane


//function to add a room
export function addRoom(data, floorId, roomName){
    // Generate a unique room ID
    const floor = data.home.floors[floorId];
    
    const newRoomId = Date.now();

    // Create the new room object
    const newRoom = {
        id: newRoomId,
        name: roomName,
        devices: []
    };

    // Return a new data object with the added room 
    const newData = {
        ...data,
        home: {
            ...data.home,
            floors: {
                ...data.home.floors,
                [floorId]: {
                    ...data.home.floors[floorId],
                    rooms: {
                        ...data.home.floors[floorId].rooms,
                        [newRoomId]: newRoom
                    }
                }
            }
        }
    };

    return newData;
}



export function deleteRoomById(data, floorId, roomId, setData){
    console.log(`Room with ID ${roomId} on floor ${floorId} removed`)
    //const newData = { ...data };
    const floor = data.home.floors[floorId];
    if (!floor || !floor.rooms[roomId]) {
        console.error(`Room with ID ${roomId} on floor ${floorId} does not exist.`);
        return data; // No changes if room doesn't exist
    }

    // Destructure to remove the room
    const { [roomId]: removedRoom, ...remainingRooms } = floor.rooms;

    // Return a new data object with the room removed (immutably)
    const newData = {
        ...data,
        home: {
            ...data.home,
            floors: {
                ...data.home.floors,
                [floorId]: {
                    ...data.home.floors[floorId],
                    rooms: remainingRooms
                }
            }
        }
    };

    return newData;
}