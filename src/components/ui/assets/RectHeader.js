import PropTypes from "prop-types";
import SubmitButton from "./Buttons";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip'


export default function Header({ label, isEditing, onEditToggle, showEditButton = false, setShowAddRoomModal, setShowRemoveRoomModal }) {
    return (
        <div className="flex flex-col md:flex-row justify-between bg-neutral-50 shadow-md border-custom p-7 rounded-lg m-5">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <h1 className="text-4xl font-bold">{label}</h1>
                {isEditing && (
                    <div className="flex flex-row items-center justify-center space-x-2">
                        <p className="text-lg font-semibold">Manage Rooms</p>
                        <Tooltip anchorSelect="#addRoom" content="Add room" place="bottom" delayShow={250} />
                        <SubmitButton
                            onClick={() => setShowAddRoomModal(true)} //These functions are defined in floor page
                            label={
                                <>
                                    <PlusIcon className="h-5 w-5" />
                                </>
                            }
                            id="addRoom"
                            padding="p-1"
                        >
                        </SubmitButton>
                        <Tooltip anchorSelect="#removeRoom" content="Remove room" place="bottom" delayShow={250} />
                        <SubmitButton
                            onClick={() => setShowRemoveRoomModal(true)}
                            label={
                                <>
                                    <MinusIcon className="h-5 w-5" />
                                </>
                            }
                            id="removeRoom"
                            padding="p-1"
                        >
                        </SubmitButton>
                    </div>
                )}
            </div>

            {/* Toggle Editing Buttons */}
            {showEditButton && !isEditing && (
                <div className="flex justify-center md:justify-center w-full md:w-auto mt-4 md:mt-0 md:flex-shrink-0">
                    <Tooltip anchorSelect="#editFloor" content="Edit floor" place="bottom" delayShow={250} />
                    <SubmitButton
                        id="editFloor"
                        onClick={onEditToggle}
                        label={
                            <>
                                <img src="/icons/edit.svg" alt="Edit" className="hidden md:block w-6 h-6 md:w-8 md:h-8" />
                                <span className="block md:hidden ml-2">Edit Floor</span>
                            </>
                        }   
                    >
                    </SubmitButton>
                </div>
            )}

            {showEditButton && isEditing && (
                <div className="flex justify-center md:justify-center w-full md:w-auto mt-4 md:mt-0 md:flex-shrink-0">
                    <Tooltip anchorSelect="#doneEdit" content="Done editing" place="bottom" delayShow={250} />
                    <SubmitButton
                        id="doneEdit"
                        onClick={onEditToggle}
                        label={
                            <>
                                <img src="/icons/done.svg" alt="Done" className="hidden md:block w-6 h-6 md:w-8 md:h-8" />
                                <span className="block md:hidden ml-2">Done Editing</span>
                            </>
                        }
                    >
                    </SubmitButton>
                </div>
            )}
        </div>
    );
}

Header.propTypes = {
    label: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onEditToggle: PropTypes.func.isRequired,
    showEditButton: PropTypes.bool.isRequired,
    setShowAddRoomModal: PropTypes.func.isRequired,
    setShowRemoveRoomModal: PropTypes.func.isRequired,
};