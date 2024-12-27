
export function getFloorsNumbers(data){
    return Object.keys(data.home.floors).map(floorId => floorId);
}

export default function getRooms(data, floorId){
    return data.home.floors[floorId].rooms;
}

export function getRoomName(data, floorId, roomId){
    return data.home.floors[floorId].rooms[roomId].name;
}

export function getDevicesIdInRoom(data, floorId, roomId){
    return data.home.floors[floorId].rooms[roomId].devices;
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

export function getUserName(data){
    return data.user.name;
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

export function getFavourites(data, userId){
    return data.user[userId].favourites
}

export function changeFavouriteStatus(data,userId=1, deviceId, isFavourite){
    if (isFavourite) {
        data.user[userId].favourites.push(deviceId);
    }else if (data.user[userId].favourites.includes(deviceId)){
        data.user[userId].favourites = data.user[userId].favourites.filter((id) => id !== deviceId);
    }
}

export function deleteDeviceById(data, setData, deviceId) {
    const updatedData = { ...data };

    if (updatedData.devices && updatedData.devices[deviceId]) {
        delete updatedData.devices[deviceId];
    }

    // usuwanie urządzenie z ulubionych wszystkich użytkowników
    if (updatedData.user) {
        Object.keys(updatedData.user).forEach((userId) => {
            const user = updatedData.user[userId];
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


    setData(updatedData);
}

export function changeDeviceName(data, setData, deviceId, newName) {
    // data.devices[deviceId].name = newName;
    setData(prev =>{
        const updatedData = { ...prev };
        updatedData.devices[deviceId].name = newName;
        return updatedData;
    })
}