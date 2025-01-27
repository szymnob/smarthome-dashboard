import { useEffect } from 'react';

export default function WeatherWidget() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://weatherwidget.io/js/widget.min.js';
        script.id = 'weatherwidget-io-js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const existingScript = document.getElementById('weatherwidget-io-js');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <a
            className="weatherwidget-io rounded-md bg-neutral-50 shadow-md h-full"
            href="https://forecast7.com/en/50d0619d94/krakow/"
            data-label_1="Kraków"
            data-label_2="WEATHER"
            data-theme="weather_one"
        />
    );
}
