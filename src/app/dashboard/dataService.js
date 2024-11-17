
export function getFloorsNumbers(data){
    return Object.keys(data.home.floors).map(floorId => floorId);
}