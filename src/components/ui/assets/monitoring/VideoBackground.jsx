import { useRef } from "react";

const VideoBackground = ({ videoSrc }) => {
    const videoRef = useRef(null);

    const handleVideoEnd = () => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    };

    return (
        <div className="w-full h-full">
            <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover z-auto"
            ></video>
        </div>
    );
};

export default VideoBackground;
