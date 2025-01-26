import * as PropTypes from "prop-types";

export default function Checkbox({label, checked, onChange}) {


    return (
        <div className="flex items-center space-x-2">
            <input id="checkbox" type="checkbox" value=""
                   className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-violet-700"/>
            <label htmlFor="checkbox" className="">
                {label}
            </label>
        </div>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}