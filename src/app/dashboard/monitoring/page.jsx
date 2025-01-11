'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import CameraFeed from "@/components/ui/assets/monitoring/CameraFeed";
import clsx from "clsx";

export default function Page() {
    const [expandedCamera, setExpandedCamera] = useState(null);
    const [animatingCamera, setAnimatingCamera] = useState(null); // Przechowuje ID kamery w trakcie animacji

    return (
        <div className={clsx("bg-gray-900 w-full h-full overflow-y-auto relative")}>
            <div className="grid p-4 overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full w-full gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((cameraId) => {
                    const isExpanded = expandedCamera === cameraId;
                    const isAnimating = animatingCamera === cameraId;

                    return (
                        <div key={cameraId}>
                            {isExpanded && (
                                <div
                                    className="aspect-[4/3] bg-transparent"
                                    style={{
                                        visibility: "hidden",
                                    }}
                                ></div>
                            )}

                            <motion.div
                                layout
                                className="cursor-pointer"
                                style={{
                                    aspectRatio: "4/3",
                                    position: isExpanded ? "absolute" : "relative",
                                    top: isExpanded ? 0 : "auto",
                                    left: isExpanded ? 0 : "auto",
                                    width: isExpanded ? "100%" : "auto",
                                    height: isExpanded ? "100%" : "auto",
                                    zIndex: isExpanded || isAnimating ? 50 : 1,
                                    background: isExpanded ? "black" : "transparent",
                                }}
                                onClick={() => {
                                    setAnimatingCamera(cameraId);
                                    setExpandedCamera(isExpanded ? null : cameraId);
                                }}
                                transition={{ duration: 0.3 }}
                                onAnimationComplete={() => {
                                    if (!isExpanded) setAnimatingCamera(null);
                                }}
                            >
                                <CameraFeed cameraId={cameraId} />
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


//
// 'use client';
//
// import { useState } from "react";
// import CameraFeed from "@/components/ui/assets/monitoring/CameraFeed";
// import clsx from "clsx";
//
// export default function Page() {
//     const [expandedCamera, setExpandedCamera] = useState(null); // ID powiększonej kamery
//
//     return (
//         <div className="bg-gray-900 p-4 w-full h-full overflow-y-auto">
//             <div className="grid grid-cols-4 gap-4 relative">
//
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13 ].map((cameraId) => (
//                     <div
//                         key={cameraId}
//                         className={clsx(
//                             "transition-all transform duration-300 cursor-pointer", {
//                                 "absolute inset-0 z-50 bg-black": expandedCamera === cameraId,
//                                 "aspect-[4/3]": expandedCamera !== cameraId,
//                             }
//                         )}
//                         onClick={() => setExpandedCamera(expandedCamera === cameraId ? null : cameraId)} // Przełączanie stanu
//                     >
//                         <CameraFeed cameraId={cameraId} />
//                     </div>
//                 ))}
//
//             </div>
//         </div>
//
//     );
// }

