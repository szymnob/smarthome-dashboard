import * as PropTypes from "prop-types";


export default function SubmitButton({onClick, label}) {

    return(
    <button
        onClick={onClick}
        className="flex-1 text-white bg-violet-500 leading-loose rounded-md border-2 border-violet-700 active:bg-violet-600 shadow-md shadow-violet-500 active:shadow-violet-500 active:shadow-lg hover:bg-violet-400 "
        >
        <p className="shadow-black drop-shadow-lg">{label}</p>
    </button>
    )
}

SubmitButton.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
}

export function CancelButton({onClick, label}) {
    return (
        <button
            className="flex-1 text-gray-700 bg-gray-100 leading-loose rounded-md border-custom hover:bg-gray-200 active:bg-gray-300 shadow-sm"
            onClick={onClick}>
            {label || "Cancel"}
        </button>
    )
}

CancelButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
}