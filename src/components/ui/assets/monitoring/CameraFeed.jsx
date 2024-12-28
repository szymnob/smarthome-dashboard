import NoiseCanva from "@/components/ui/assets/monitoring/NoiseCanva";
import VideoBackground from "@/components/ui/assets/monitoring/VideoBackground";

export default function CameraFeed({cameraId}){

    let src;
    if(cameraId === 2){
        src = "https://cdn.discordapp.com/attachments/1202677699881992233/1322677911748218910/static_s_1.mp4?ex=6771bf4c&is=67706dcc&hm=6ce23fba677df9075e16e992ec47a7c67243b5dae6428a3f2c93e4599445a740&";
    }else{
        src = "/video/static.mp4";
    }

    return(
        <div className="w-full h-full bg-neutral-400 relative ">
            {/*<NoiseCanva/>*/}

            <VideoBackground videoSrc={src} />

            {/*Ikona*/}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="aspect-square w-1/3 h-auto p-3 bg-neutral-700  bg-opacity-50 rounded-[20%] flex items-center justify-center">
                    <img src="/icons/devices/camera-slash.svg" className="w-auto h-auto"/>
                </div>
            </div>
            {/*Podpis*/}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                {`Camera ${cameraId}`}
            </div>
        </div>
    )
}