
import Wheel from "@uiw/react-color-wheel";
import {useEffect, useState} from "react";
import Slider from "@/components/ui/assets/SliderComponent";
import * as PropTypes from "prop-types";

export default function Light({properties, setProperties}) {
    const[brightness, setBrightness] = useState( 50);


    const [isInitialized, setIsInitialized] = useState(false); // Czy dane zostały zainicjalizowane?

    useEffect(() => {
        if (!isInitialized) {
                setBrightness(properties.brightness || 50)

            setIsInitialized(true); // Dane zostały zainicjalizowane
        }
    }, [properties, isInitialized]);

    useEffect(() => {
        if(isInitialized && brightness !== ""){
        setProperties((prev) => ({
            ...prev,
            brightness: brightness
        }));
        }
    }, [ brightness, setProperties]);


    if(!properties || !setProperties){
        return (
            <div className="flex items-center justify-center p-5">Loading...</div>
        )
    }

    return(
        <div className="flex flex-col justify-center items-center space-y-7">

                <Slider label="Brigtness" value={brightness} type="brightness" setValue={setBrightness}/>

        </div>
    )
}

Light.propTypes = {
    properties: PropTypes.object,
    setProperties: PropTypes.func
}