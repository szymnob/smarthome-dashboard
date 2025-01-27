'use client';

import {use, useContext, useEffect, useState} from 'react';
import DataContext from '@/app/dashboard/data/dataContext';
import Header from "@/components/ui/assets/RectHeader";
import RoomComponent from "@/components/views/room/RoomComponent";
import Input from "@/components/ui/assets/Input";
import SubmitButton from "@/components/ui/assets/Buttons";
import {CancelButton} from "@/components/ui/assets/Buttons";
import { getRoomsIdOnFloor, addRoom, deleteRoomById, getRoomName } from "@/app/dashboard/data/dataService";
import ModalWindow from "@/components/ui/assets/modals/ModalWindow";
import Select from "@/components/ui/assets/Select";

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
        if (data && floorId) {
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
            <Header
                label={`Floor ${floorId}`}
                isEditing={isEditing}
                onEditToggle={handleEditToggle}
                showEditButton={true}
                setShowAddRoomModal={setShowAddRoomModal}
                setShowRemoveRoomModal={setShowRemoveRoomModal}
            />

            <div className="flex flex-wrap justify-center m-2">
                {roomsId.map((roomId) => (
                    <div key={roomId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                        <RoomComponent
                            floorId={floorId}
                            roomId={roomId}
                            isEditing={isEditing}
                        />
                    </div>
                ))}
            </div>

            {/* Add Room Modal */}

            <ModalWindow isVisible={showAddRoomModal} title={"Add room"} onClose={() => {
                setShowAddRoomModal(false);
                setError('');
                setNewRoomName('');
            }}>
                <div className="m-5">
                <form onSubmit={handleAddRoom}>
                    <Input
                        id="newRoomName"
                        label="New room name:"
                        labelColor="black"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        error={error}
                    />
                    <div className="flex justify-end space-x-2 mt-4">
                        <CancelButton
                            type="button"
                            onClick={() => {
                                setShowAddRoomModal(false);
                                setError('');
                                setNewRoomName('');
                            }}
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
            </ModalWindow>

            {/* Remove Room Modal */}

            <ModalWindow isVisible={showRemoveRoomModal} onClose={() => { setShowRemoveRoomModal(false); setRemoveError(''); setSelectedRoomId(''); }} title={"Remove room"}>
                <div className="m-5">
                    <form className="space-y-5" onSubmit={handleRemoveRoom}>

                            <Select label="Select Room:" value={selectedRoomId}
                                    onChange={(e) => {
                                        setSelectedRoomId(e.target.value)
                                        setRemoveError('');
                                    }}>
                                <option value="" disabled>Select a room</option>
                                {roomsId.map((roomId) => {
                                    const roomName = getRoomName(data, floorId, roomId);
                                    return (
                                        <option key={roomId} value={roomId}>
                                            {roomName}
                                        </option>
                                    );
                                })}
                            </Select>

                            {removeError && <div
                                className=" block p-2 w-full text-center bg-red-400 shadow-md shadow-red-300 rounded-lg leading-loose">{removeError}</div>}

                            {/*<label htmlFor="roomSelect" className="whitespace-nowrap text-black">Select Room:</label>*/}
                            {/*<select*/}
                            {/*    id="roomSelect"*/}
                            {/*    value={selectedRoomId}*/}
                            {/*    onChange={(e) => setSelectedRoomId(e.target.value)}*/}
                            {/*    className="w-full p-2 border rounded-lg"*/}
                            {/*    required*/}
                            {/*>*/}
                            {/*    <option value="" disabled>Select a room</option>*/}
                            {/*    {roomsId.map((roomId) => {*/}
                            {/*        const roomName = getRoomName(data, floorId, roomId);*/}
                            {/*        return (*/}
                            {/*            <option key={roomId} value={roomId}>*/}
                            {/*                {roomName}*/}
                            {/*            </option>*/}
                            {/*        );*/}
                            {/*    })}*/}
                            {/*</select>*/}


                            {/*{removeError && <div className="text-red-500 mt-2">{removeError}</div>}*/}
                        <div className="flex flex-row justify-between space-x-5 p-2">
                            <CancelButton
                                type="button"
                                onClick={() => {
                                    setShowRemoveRoomModal(false);
                                    setRemoveError('');
                                    setSelectedRoomId('');
                                }}
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
            </ModalWindow>

        </>
    );
}