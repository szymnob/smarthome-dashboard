import VideoBackground from "@/components/ui/assets/monitoring/VideoBackground";
import {useEffect, useState} from "react";

const movieXD = "https://dl.dropboxusercontent.com/scl/fi/9zfj9wk7kv7dmbvjon1dr/natsu-1.mp4?rlkey=so6av6bcnhknq0nbygmaf9ejj&st=klan78sy&dl=0"
const movieScary = "https://dl.dropboxusercontent.com/scl/fi/dtz6yeizhqvmo59vppmlj/static_s_1-1.mp4?rlkey=ezmfhdc63gyvxd9bi2zs86pyo&st=ev32ravz&dl=0"
const apetor = "https://dl.dropboxusercontent.com/scl/fi/gow7kot8xp27lsnf2336c/apetor-1.mp4?rlkey=th5fyezbvrxfbljhji0udus5b&st=mtvqu07s&dl=0"
const boom = "https://dl.dropboxusercontent.com/scl/fi/707o5vez9ky8x7nlpg32v/achtung-1.mp4?rlkey=sodrne3lcby67urxgiaqh623r&st=jca8o2so&dl=0"
const jumper = "https://dl.dropboxusercontent.com/scl/fi/1v0xbbbiwo1auaw67xj8k/jumper-1.mp4?rlkey=i6itt1kxayj1aa10ozejtj38s&st=fdfre8ui&dl=0"
const sentino = "https://dl.dropboxusercontent.com/scl/fi/mur8we0cfr40dd3u8k1vp/sentino-1.mp4?rlkey=43fcu8lp2vagad137n2815nrb&st=h9ym9ahc&dl=0"
const testo = "https://dl.dropboxusercontent.com/scl/fi/74aqeat2ht4o80cg7yusk/testo-1.mp4?rlkey=gn34d9f6tm9cxotctv5ctybgd&st=yccr7uj2&dl=0"


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
        // 5: {m: () => toogleSource(movieScary) },
        6: {n: () => toogleSource(movieXD) },
        7: {t: () => toogleSource(testo) }
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
        if (cameraId === 5) {
            setTimeout(() => {
                toogleSource(movieScary);

            }, 10000);
        }
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