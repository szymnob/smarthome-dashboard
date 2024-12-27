import {useEffect, useState, useRef} from "react";

export default function DropdownSettings({onRename, onDelete}){

    const[menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleMenuOpen = () => setMenuOpen(prevState => !prevState);

    //sprawdzanie czy kliknieto poza menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
             }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div ref={menuRef} className="relative">
            <div className="w-9 h-auto cursor-pointer transition-transform duration-200 rounded-md hover:bg-neutral-200 hover:scale-105 active:scale-95 "
                 onClick={handleMenuOpen}>
                <img className="w-full h-auto" src="/icons/menu.svg" alt="Menu"/>
            </div>

            {menuOpen && (
                <div className="absolute p-1 right-0 mt-2 w-48 bg-white border border-custom rounded-lg shadow-lg z-50">
                    <button
                        className="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100"
                        onClick={() => {
                            setMenuOpen(false);
                            onRename();
                        }}
                    >
                        Rename Device
                    </button>
                    <button
                        className="block w-full px-4 py-2 text-left text-red-500  rounded-lg hover:bg-gray-100"
                        onClick={() => {
                            setMenuOpen(false);
                            onDelete();
                        }}
                    >
                        Delete Device
                    </button>
                </div>
            )}

        </div>
    )
}