
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

export function getDeviceName(data, floorId, roomId, deviceId){
    return data.home.floors[floorId].rooms[roomId].devices[deviceId].name;
}

export function getRoomsIdOnFloor(data, floorId){
    return Object.keys(data.home.floors[floorId].rooms).map(roomId => roomId);
}
export function getDeviceTypeById(data, deviceId){
    return data.devices[deviceId].type;
}