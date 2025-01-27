import * as PropTypes from "prop-types";

const sliderConfig = {
    default: {
        unit: "",
        minValue: 0,
        maxValue: 100,
        style: "bg-gray-800",
        label: ""
    },
    temperatureAC: {
        unit: "°C",
        minValue: 15,
        maxValue: 30,
        style: "bg-gradient-to-r from-blue-600 to-red-700",
        label: "Temperature"
    },
    temperatureHeater: {
        unit: "°C",
        minValue: 20,
        maxValue: 30,
        style: "bg-gradient-to-r from-blue-600 to-red-700",
        label: "Temperature"
    },
    brightness: {
        unit: "%",
        minValue: 0,
        maxValue: 100,
        style: "bg-gradient-to-r from-gray-900 to-amber-200",
        label: "Brightness",
    },
    colorTemperature: {
        unit: "K",
        minValue: 2000,
        maxValue: 6500,
        style: "bg-gradient-to-r from-orange-600 to-blue-300",
        label: "Color Temperature"
    },
    blindsPosition: {
        unit: "% Open",
        minValue: 0,
        maxValue: 100,
        style: "bg-gradient-to-r from-gray-900 to-amber-200",
        label: "Blinds Position"
    }
}

export default function Slider({ setValue, value, type="default"}){

    const config = sliderConfig[type];

    return (
        <>
            <div className="w-full flex flex-col space-y-2">
                {/*Tymaczowe min max, dziala zle ale pokazuje*/}
                <p>{config.label} - <b>{value}{config.unit}</b></p>
                <input id="range" type="range" value={value} onChange={(e) => setValue(e.target.value)} min={parseInt(config.minValue)}
                       max={parseInt(config.maxValue)} step="1"
                       className={`transparent w-full outline-0 h-4 rounded-lg border-custom appearance-none cursor-pointer ${config.style}`}/>
            <div className="flex flex-row justify-between">
                <p>{config.minValue}{config.unit}</p>
                <p>{config.maxValue}{config.unit}</p>
            </div>
            </div>


            <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                    width: 24px;
                    height: 24px;
                    background: #FFFFFF;
                    border: 1px solid #c1c1c1;
                    border-radius: 50%;
                    cursor: pointer;
                    -webkit-appearance: none;
                }

            `}</style>
        </>
    )
}

Slider.propTypes = {
    setValue: PropTypes.func,
    value: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(sliderConfig))
}