'use client';

import Navigation from '@/components/ui/navigation/Navigation';
import { useState } from 'react';
import AddNewFloor from '@/components/views/AddNewFloor';

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showAddFloorModal, setShowAddFloorModal] = useState(false);

    const openModal = () => setShowAddFloorModal(true);
    const closeModal = () => setShowAddFloorModal(false);

    return (
            <div className="flex h-screen">
                <div
                    className={`fixed inset-0 z-50 flex justify-start items-start bg-black bg-opacity-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                     md:translate-x-0 md:relative md:flex-none md:bg-transparent md:transition-none`}
                >
                    <Navigation openModal={openModal} />
                </div>
                <div className={`flex-grow md:overflow-y-auto ${isOpen ? 'overflow-hidden' : ''}`}>
                    <button
                        className="md:hidden p-4 w-auto h-auto  bg-gray-400 text-white rounded-full fixed top-4 right-4 z-50"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                    <div className="relative h-full">
                        {children}
                        <AddNewFloor isVisible={showAddFloorModal} onClose={closeModal} />
                        <div className="absolute bottom-0 w-full">
                            {/* This div will always be at the bottom */}
                        </div>
                    </div>
                </div>
            </div>
    );
}