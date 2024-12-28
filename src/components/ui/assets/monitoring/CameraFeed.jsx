import NoiseCanva from "@/components/ui/assets/monitoring/NoiseCanva";
import VideoBackground from "@/components/ui/assets/monitoring/VideoBackground";

export default function CameraFeed({cameraId}){

    return(
        <div className="w-full h-full bg-neutral-400 relative ">
            {/*<NoiseCanva/>*/}
            <VideoBackground videoSrc="/video/static.mp4" />

            {/*Ikona*/}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="aspect-square w-1/4 h-auto p-3 bg-neutral-700 bg-opacity-50 rounded-[20%] flex items-center justify-center">
                    <img src="/icons/camera-slash.svg" className="w-auto h-auto"/>
                </div>
            </div>
            {/*Podpis*/}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                {`Camera ${cameraId}`}
            </div>
        </div>
    )
}