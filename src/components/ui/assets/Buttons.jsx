import * as PropTypes from "prop-types";


export default function SubmitButton({id="", onClick, label, width = "auto", height = "auto", padding = "p-2"}) {
    return(
        <button
            onClick={onClick}
            id={id}
            className={`flex-1 text-white bg-violet-500 leading-loose rounded-md border-2 border-violet-700 active:bg-violet-600 shadow-md shadow-violet-500 active:shadow-violet-500 active:shadow-lg hover:bg-violet-400
                ${padding} ${width} ${height}`}
        >
            <p className="shadow-black drop-shadow-lg text-center">{label}</p>
        </button>
    )
}

SubmitButton.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    padding: PropTypes.string,
}

SubmitButton.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
}

export function CancelButton({onClick, label}) {
    return (
        <button
            className="flex-1 text-gray-700 bg-gray-100 leading-loose rounded-md border-custom hover:bg-gray-200 active:bg-gray-300 shadow-sm p-2"
            onClick={onClick}>
            {label || "Cancel"}
        </button>
    )
}

CancelButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
}