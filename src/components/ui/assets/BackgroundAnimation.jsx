import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
// import { loadSlim } from "@tsparticles/slim";

export default function BackgroundAnimation(){
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const iconNames = ["light", "home", "tv", "refrigerator", "tv", "air_conditioner"];

    const iconPaths = iconNames.map((name) => ({
        src: `/icons/${name}.svg`,
        width: 100,
        height: 100,
        replaceColor: true,
    }));


    const options = useMemo(
        () => ({
            autoPlay: true,
            background: {
                image: "linear-gradient(45deg, #31135E, #6427be)", // Gradient tła
            },
            fullScreen: { enable: true, zIndex: -1 },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 100,
                    density: { enable: true, area: 800 }
                },
                color: { value: "#FFFFFF" },
                collisions: {
                    enable: true,
                    mode: "bounce"
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    outModes: { default: "out" }
                },
                size: {
                    value: { min: 15, max: 25 },
                    random: true
                },
                opacity: {
                    value: 0.7,
                    random: true
                },
                shape: { type: ["images"],
                    options: {
                        images: iconPaths,
                    }
                },


            },
            detectRetina: true
        }),
        [],
    );

    if (init) {
        return (
            <div className="relative w-full h-screen overflow-hidden blur-[0px]" >

            <Particles
                id="tsparticles"
                options={options}

            />
            </div>

        );
    }

    return <></>;
};