'use client';
import React, { useEffect, useRef } from "react";

const NoiseCanvas = ({ color = [247, 182, 153], patternSize = 64, patternRefreshInterval = 20, patternAlpha = 15 }) => {
    const canvasRef = useRef(null);
    let frame = 0;

    // Inicjalizacja canvas i rozmiaru
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Generowanie szumu
        const updateAndDraw = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const randomValue = Math.random() * 150 | 0; // Jasność szumu
                const alpha = Math.random() > 0.6 ? randomValue : 0; // Przezroczystość

                data[i] = color[0]; // R
                data[i + 1] = color[1]; // G
                data[i + 2] = color[2]; // B
                data[i + 3] = alpha; // A
            }

            ctx.putImageData(imageData, 0, 0);
        };

        // Pętla animacji
        const loop = () => {
            if (++frame % patternRefreshInterval === 0) {
                updateAndDraw();
            }
            requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [color, patternRefreshInterval]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default NoiseCanvas;
