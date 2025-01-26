import clsx from "clsx";
import * as PropTypes from "prop-types";


export default function Select({children, label, value, onChange}) {


    return(
        <div className="flex items-center justify-center space-x-2">
            <label htmlFor="countries" className="block mb-2 text-nowrap">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                    className="min-w-60 bg-gray-50 border border-violet-100 text-gray-900 text-sm rounded-lg focus:ring-violet-700 focus:border-violet-700 focus:shadow focus:shadow-violet-500 block w-full p-2.5">
                {children}
            </select>
        {/*thers no way to change option color witouh creating own component for that*/}

        </div>
    )
}

Select.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
    label: PropTypes.string
}