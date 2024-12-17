import clsx from "clsx";
import * as PropTypes from "prop-types";


export default function Input({  id, label, labelColor, type = "text", value, onChange, error}) {


    return(
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center justify-between space-x-4">
                    <label htmlFor={id} className={clsx("", {
                        "text-white shadow-black  drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]": labelColor === "white",
                        "text-black": labelColor === "black",
                    })} >
                        {label}
                    </label>
                    <input value={value} id={id} type={type} onChange={onChange} className={clsx("rounded-lg border-2 p-1 border-violet-100 focus:outline-none focus:border-2 focus:border-violet-700 focus:shadow focus:shadow-violet-500",
                        {
                            "border-red-400 focus:border-red-400 focus:shadow-red-300": error,
                        })}
                    />
                </div>

                {/*{error && <div*/}
                {/*    className="w-full text-center bg-red-400 shadow-md shadow-red-300 rounded-lg leading-loose">{error}</div>}*/}
            </div>
    )
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    labelColor: PropTypes.oneOf(["white", "black"]),
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
}