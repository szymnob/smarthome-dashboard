import * as PropTypes from "prop-types";

const sliderConfig = {
    default: {
        minValue: 0,
        maxValue: 100,
        style: "bg-gray-800",
        label: ""
    },
    temperatureAC: {
        minValue: "15°C",
        maxValue: "30°C",
        style: "bg-gradient-to-r from-blue-600 to-red-700",
        label: "Temperature"
    },
    temperatureHeater: {
        minValue: "20°C",
        maxValue: "30°C",
        style: "bg-gradient-to-r from-blue-600 to-red-700",
        label: "Temperature"
    },
    brightness: {
        minValue: "0%",
        maxValue: "100%",
        style: "bg-gradient-to-r from-gray-900 to-amber-200",
        label: "Brightness",
    },
    colorTemperature: {
        minValue: "2000K",
        maxValue: "6500K",
        style: "bg-gradient-to-r from-orange-600 to-blue-300",
        label: "Color Temperature"
    },
    blindsPosition: {
        minValue: "Closed",
        maxValue: "Open",
        style: "bg-gradient-to-r from-gray-900 to-amber-200",
        label: "Blinds Position"
    }
}

export default function Slider({ setValue, value, type="default"}){

    const config = sliderConfig[type];

    return (
        <>
            <div className="w-full flex flex-col space-y-2">
                <p>{config.label}</p>
                <input id="range" type="range" value={value} onChange={(e) => setValue(e.target.value)} min="0"
                       max="100" step="1"
                       className={`transparent w-full outline-0 h-4 rounded-lg border-custom appearance-none cursor-pointer ${config.style}`}/>
            <div className="flex flex-row justify-between">
                <p>{config.minValue}</p>
                <p>{config.maxValue}</p>
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