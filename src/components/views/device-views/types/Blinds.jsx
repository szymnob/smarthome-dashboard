
import Wheel from "@uiw/react-color-wheel";
import {useEffect, useState} from "react";
import Slider from "@/components/ui/assets/SliderComponent";
import * as PropTypes from "prop-types";

export default function Blinds({properties, setProperties}) {
    const[temperature, setTemperature] = useState( 3);


    const [isInitialized, setIsInitialized] = useState(false); // Czy dane zostały zainicjalizowane?

    useEffect(() => {
        if (!isInitialized) {
            setTemperature(properties.temperature || 3);

            setIsInitialized(true); // Dane zostały zainicjalizowane
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
        <div className="flex flex-col justify-center items-center space-y-7">

            <Slider label="Temperature" value={temperature} type="blindsPosition" setValue={setTemperature}/>

        </div>
    )
}

Blinds.propTypes = {
    properties: PropTypes.object,
    setProperties: PropTypes.func
}