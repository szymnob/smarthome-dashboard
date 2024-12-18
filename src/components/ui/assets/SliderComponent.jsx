import * as PropTypes from "prop-types";


export default function Slider({ setValue, value}){




    return (
        <>

            <input id="range" type="range" value={value} onChange={(e) => setValue(e.target.value)} min="0"
                   max="100" step="1"
                   className="transparent w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer "/>


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
    value: PropTypes.number
}