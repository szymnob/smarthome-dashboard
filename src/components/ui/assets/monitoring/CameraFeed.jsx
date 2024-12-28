import VideoBackground from "@/components/ui/assets/monitoring/VideoBackground";
import {useEffect, useState} from "react";

const movieXD = "https://cdn.discordapp.com/attachments/1202677699881992233/1322679945872281701/SEX_KAMERKI_NATSU_720.mp4?ex=6771c131&is=67706fb1&hm=825d6711be07eabf3c8b5dd0cd8459e19802d571e20ad1bf3224408d8b5a48c7&"
const movieScary = "https://cdn.discordapp.com/attachments/1202677699881992233/1322677911748218910/static_s_1.mp4?ex=6771bf4c&is=67706dcc&hm=6ce23fba677df9075e16e992ec47a7c67243b5dae6428a3f2c93e4599445a740&"
const apetor = "https://cdn.discordapp.com/attachments/1202677699881992233/1322696103925252097/apetor.mp4?ex=6771d03d&is=67707ebd&hm=5917f794b61a0f91a36256129c9ddbd310161194dcebcbebb5a506335855519e&"
const boom = "https://cdn.discordapp.com/attachments/1202677699881992233/1322697930427334676/achtung.mp4?ex=6771d1f1&is=67708071&hm=6dc246fb7277de419ba7c57aa4b429353517823ceda7fc37fa688131f9b9f6e9&"
const jumper = "https://cdn.discordapp.com/attachments/1202677699881992233/1322702434828685322/jumper.mp4?ex=6771d623&is=677084a3&hm=69482d6cc067d3c57181b2fec60da00f1ca2c8a0ba35184400f1bceb31d34d75&"
const sentino = "https://cdn.discordapp.com/attachments/1202677699881992233/1322703345709744219/sentino.mp4?ex=6771d6fc&is=6770857c&hm=f82fbdd3117a423033854da29cb31fdf6ba6797726af262393afcaef5253c509&"

const whiteNoise = "/video/static.mp4"

export default function CameraFeed({cameraId}){
    const[src, setSrc] = useState(whiteNoise);

    const toogleSource = (newSrc) => {
        setSrc(prevSrc => (prevSrc === newSrc ? whiteNoise : newSrc));
    }

    const moviesMap = {
        1: {a: () => toogleSource(apetor) },
        2: {b: () => toogleSource(boom) },
        3: {j: () => toogleSource(jumper) },
        4: {s: () => toogleSource(sentino) },
        5: {m: () => toogleSource(movieScary) },
        6: {n: () => toogleSource(movieXD) }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const movieForCam = moviesMap[cameraId];

            if(movieForCam){
                const action = movieForCam[event.key];
                if(action) action();
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [cameraId]);



    const loadAllMovies = () => {
        const cameraBehaviors = moviesMap[cameraId];
        if (cameraBehaviors) {
            Object.values(cameraBehaviors).forEach((action) => {
                action();
            });
        }
    };

    useEffect(() => {
        loadAllMovies();
    }, []);


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