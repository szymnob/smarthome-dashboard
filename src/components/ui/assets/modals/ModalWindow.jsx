import { motion, AnimatePresence } from "framer-motion";
import * as PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

export default function ModalWindow({ isVisible, onClose, title, children, headerActions }) {
    // tlo
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    // okno
    const modalVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="flex-col max-h-full overflow-y-auto transform bg-neutral-50 shadow-md border-custom rounded-lg"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-row justify-between items-center p-4 border-violet-200 border-b-2">
                            <h1 className="text-xl font-medium text-center">{title}</h1>
                            <div className="flex items-center justify-between space-x-1">
                                {headerActions}
                                <div
                                    className="w-9 h-auto cursor-pointer transition-transform duration-200 rounded-md hover:bg-neutral-200 hover:scale-105"
                                    onClick={onClose}
                                    id="close"
                                >
                                    <img className="w-full h-auto" src="/icons/close.svg" alt="Close" />
                                </div>
                                <Tooltip anchorSelect="#close" content="Close" place="right" delayShow={500} />
                            </div>
                        </div>
                        <div>{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

ModalWindow.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    headerActions: PropTypes.node,
};
