import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundAnimation(){
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            autoPlay: true,
            background: {
                color: { value: "#31135E" }
            },
            fullScreen: { enable: true, zIndex: -1 },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 100,
                    density: { enable: true, area: 800 }
                },
                color: { value: "#ffffff" },
                collisions: {
                    enable: true,
                    mode: "bounce"
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    outModes: { default: "out" }
                },
                size: {
                    value: { min: 6, max: 15 },
                    random: true
                },
                opacity: {
                    value: 0.7,
                    random: true
                },
                shape: { type: "circle" }
            },
            detectRetina: true
        }),
        [],
    );

    if (init) {
        return (
            <div className="relative w-full h-screen overflow-hidden blur-[1px]">

            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                style={{}}
            />
            </div>

        );
    }

    return <></>;
};