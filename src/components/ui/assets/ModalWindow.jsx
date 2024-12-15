import clsx from "clsx";
import * as PropTypes from "prop-types";


export default function ModalWindow({isVisible, onClose, title, children}) {

    if(!isVisible) return null;

    return(
            <div className={clsx("fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 transition-opacity duration-600 flex items-center justify-center z-50",
                {
                    "opacity-0 pointer-events-none": !isVisible,
                    "opacity-100": isVisible,
                })}
                 onClick={onClose}
            >
                <div className={clsx("flex-col overflow-auto transform transition-transform duration-300 bg-neutral-50 shadow-md border-custom rounded-lg ",
                    {
                        "scale-100": isVisible,
                        "scale-90": !isVisible,
                    })}
                     onClick={(e)=> e.stopPropagation()}>

                    <div className="flex flex-row justify-between items-center p-4 border-violet-200 border-b-2 ">
                        <h1 className="text-xl font-medium text-center">{title}</h1>
                        <div className="w-9 h-auto cursor-pointer rounded-md hover:bg-neutral-200 hover:scale-105 " onClick={onClose}>
                            <img className="w-full h-auto" src="/icons/close.svg" alt="Close"/>
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>

                </div>

            </div>
    )
}

ModalWindow.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
}