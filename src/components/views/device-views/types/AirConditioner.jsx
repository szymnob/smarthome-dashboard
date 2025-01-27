import {useEffect, useState} from "react";
import Slider from "@/components/ui/assets/SliderComponent";
import * as PropTypes from "prop-types";

export default function AirConditioner({properties, setProperties}) {

    const[temperature, setTemperature] = useState( 3);
    const[currentTemperatiure, setCurrentTemperature] = useState(20);


    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            setTemperature(properties.temperature || 3);

            setIsInitialized(true);
        }
    }, [properties, isInitialized]);

    useEffect(() => {
        if(isInitialized && temperature !== ""){
            setProperties((prev) => ({
                ...prev,
                temperature: temperature
            }));
        }
    }, [temperature, setProperties]);


    if(!properties || !setProperties){
        return (
            <div className="flex items-center justify-center p-5">Loading...</div>
        )
    }

    return(
        <div className="flex flex-col justify-center items-center space-y-3">
            <div className="w-full">
                Temperature in room: {currentTemperatiure}°C
            </div>
            <Slider label="Temperature" value={temperature} type="temperatureAC" setValue={setTemperature}/>

        </div>
    )
}

AirConditioner.propTypes = {
    properties: PropTypes.object,
    setProperties: PropTypes.func
}