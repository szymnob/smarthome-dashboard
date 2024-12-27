
import Wheel from "@uiw/react-color-wheel";
import {useEffect, useState} from "react";
import Slider from "@/components/ui/assets/SliderComponent";
import * as PropTypes from "prop-types";

export default function RgbLight({properties, setProperties}) {
    const [hexColor, setHexColor] = useState(null);
    const[brightness, setBrightness] = useState( "");


    const [isInitialized, setIsInitialized] = useState(false); // Czy dane zostały zainicjalizowane?

    useEffect(() => {
        if (!isInitialized) {
                setHexColor(properties.color || "#FF2211");
                setBrightness(properties.brightness || 50)

            setIsInitialized(true); // Dane zostały zainicjalizowane
        }
    }, [properties, isInitialized]);

    useEffect(() => {
        if(isInitialized && brightness !== ""){
        setProperties((prev) => ({
            ...prev,
            color: hexColor,
            brightness: brightness
        }));
        }
    }, [hexColor, brightness, setProperties]);


    if(!properties || !setProperties){
        return (
            <div className="flex items-center justify-center p-5">Loading...</div>
        )
    }

    return(
        <div className="flex flex-col justify-center items-center space-y-7">

                <Wheel color={hexColor} width={250} height={250} radius={200} onChange={(color) => setHexColor(color.hex)} />
                <div className="w-full h-[34px] mt-5 border-custom rounded-md " style={{background: hexColor}}></div>

                <Slider label="Brigtness" value={brightness} type="brightness" setValue={setBrightness}/>

        </div>
    )
}

RgbLight.propTypes = {
    properties: PropTypes.object,
    setProperties: PropTypes.func
}