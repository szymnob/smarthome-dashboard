'use client';

import Header from "@/components/ui/assets/RectHeader";
import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import RoomComponent from "@/components/views/room/RoomComponent";
import {getRoomsIdOnFloor, addRoom, deleteRoomById, getRoomName} from "@/app/dashboard/data/dataService";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import Input from "@/components/ui/assets/Input";
import SubmitButton from "@/components/ui/assets/Buttons";
import CancelButton from "@/components/ui/assets/Buttons";



export default function Page({ params }) {
    const { data, setData } = useContext(DataContext);
    const [floorNotFound, setFloorNotFound] = useState(false);
    const [roomsId, setRoomsId] = useState([]);

    const useParams = use(params);
    const floorId = useParams.floorId;
 
    const [isEditing, setIsEditing] = useState(false);

    // States for Add Room Modal
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [error, setError] = useState('');

    const [showRemoveRoomModal, setShowRemoveRoomModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [removeError, setRemoveError] = useState('');


    useEffect(() => {
        if (data) {

            if (!data.home.floors[floorId]) {
                setFloorNotFound(true);
            } else {
                setFloorNotFound(false);
                setRoomsId(getRoomsIdOnFloor(data, floorId));
            }
        }
    }, [data, floorId]);

    
    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };
    

    const handleAddRoom = (e) => {
        e.preventDefault();
        if (!newRoomName.trim()) {
            setError('Room name cannot be empty.');
            return;
        }

        // Call addRoom from DataService and get the new data
        const newData = addRoom(data, floorId, newRoomName);

        // Update data in context
        setData(newData);

        // Reset modal states
        setNewRoomName('');
        setError('');
        setShowAddRoomModal(false);
    };


    // Handler for removing a room
    const handleRemoveRoom = (e) => {
        e.preventDefault();
        if (!selectedRoomId) {
            setRemoveError('Please select a room to remove.');
            return;
        }

        // Confirm removal
        if (!window.confirm('Are you sure you want to remove this room?')) {
            return;
        }

        // Call deleteRoomById from DataService and get the new data
        const newData = deleteRoomById(data, floorId, selectedRoomId);

        // Update data in context
        setData(newData);

        // Reset modal states
        setSelectedRoomId('');
        setRemoveError('');
        setShowRemoveRoomModal(false);
    };




    if (floorNotFound) {
        return (
            <div className="h-auto w-auto flex justify-center items-center p-6 bg-red-500 text-white">
                <h1 className="text-4xl font-bold">Floor not found</h1>
            </div>
        );
    }
    return (
        <>
            <Header label={`Floor ${floorId}`}
            isEditing={isEditing}
            onEditToggle={handleEditToggle}
            showEditButton={true}
            />
            
            <div className="flex flex-wrap justify-center">
            {roomsId.map((roomId) => (
                <RoomComponent 
                key={roomId} 
                floorId={floorId} 
                roomId={roomId}
                isEditing={isEditing}/>
            ))}
            </div>

            {/* Add/Remove Room */}
            {/*TODO: Move this to header(?) */}
                        {isEditing && (
                            <div className="flex flex-col items-center m-4 mb-12">
                                <div className="flex flex-col space-y-2 items-center">
                                    <h1 className="text-2xl font-bold text-center">Add/Remove Room</h1>
                                    <div className="justify-center border-2 bg-neutral-50 shadow-md border-custom border-gray-300 p-4 rounded-lg flex space-x-4 mt-2 p-2">
                                        <SubmitButton
                                            onClick={() => setShowAddRoomModal(true)}
                                            label={<PlusIcon className="h-6 w-6 sm:h-10 sm:w-10"
                                            padding="p-0" />}
                                        >
                                        </SubmitButton>
                                        <SubmitButton
                                            onClick={() => setShowRemoveRoomModal(true)}
                                            label={<MinusIcon className="h-6 w-6 sm:h-10 sm:w-10"
                                            padding="p-0"
                                             />}
                                        >
                                        </SubmitButton>
                                    </div>
                                </div>
                            </div>
                        )}
                        
            {/* Add Room Modal */}
            {showAddRoomModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div 
                        className="bg-white p-6 rounded-lg shadow-lg w-80"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-room-title"
                    >
                        <h2 id="add-room-title" className="text-xl mb-4">Add New Room</h2>
                        <form onSubmit={handleAddRoom}>
                            <Input
                                id="newRoomName"
                                label="Room Name"
                                labelColor="black"
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                                error={error}
                            />
                            <div className="flex justify-end space-x-2 mt-4">
                                {/*TODO: This button should have gray bg, not purple*/}
                                <CancelButton
                                    type="button"
                                    onClick={() => { setShowAddRoomModal(false); setError(''); setNewRoomName(''); }}
                                    label={"Cancel"}
                                >
                                </CancelButton>
                                <SubmitButton
                                    type="submit"
                                    label="Add"
                                >
                                </SubmitButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Remove Room Modal */}
            {showRemoveRoomModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div 
                        className="bg-white p-6 rounded-lg shadow-lg w-80"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="remove-room-title"
                    >
                        <h2 id="remove-room-title" className="text-xl mb-4">Remove Room</h2>
                        <form onSubmit={handleRemoveRoom}>
                            <div className="mb-4">
                                <label htmlFor="roomSelect" className="block text-black mb-2">Select Room:</label>
                                <select
                                    id="roomSelect"
                                    value={selectedRoomId}
                                    onChange={(e) => setSelectedRoomId(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                >
                                    <option value="" disabled>Select a room</option>
                                    {roomsId.map((roomId) => {
                                        const roomName = getRoomName(data, floorId, roomId);
                                        return (
                                            <option key={roomId} value={roomId}>
                                                {roomName}
                                            </option>
                                        );
                                    })}
                                </select>
                                {removeError && <div className="text-red-500 mt-2">{removeError}</div>}
                            </div>
                            <div className="flex justify-end space-x-2">
                                {/*TODO: This button should have gray bg, not purple*/}
                                <CancelButton
                                    type="button"
                                    onClick={() => { setShowRemoveRoomModal(false); setRemoveError(''); setSelectedRoomId(''); }}
                                    label="Cancel"
                                >
                                </CancelButton>
                                <SubmitButton
                                    type="submit"
                                    label="Remove"
                                >
                                </SubmitButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
