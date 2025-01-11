// import * as PropTypes from "prop-types";

// export default function Header({ label }) {
//     return (
//         <div className="flex flex-row justify-between bg-neutral-50 shadow-md border-custom p-7 rounded-lg m-5">
//             <h1 className="text-4xl text-bold">{label}</h1>
//         </div>
//     );
// }

// Header.propTypes = {
//     label: PropTypes.string.isRequired,
// };

// Header.js
import PropTypes from "prop-types";

export default function Header({ label, isEditing, onEditToggle }) {
    let editButton = null;
    if (onEditToggle) {
        editButton = (
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={onEditToggle}
            >
                {isEditing ? "Disable Editing" : "Enable Editing"}
            </button>
        );
    }

    return (
        <div className="flex flex-row justify-between bg-neutral-50 shadow-md border-custom p-7 rounded-lg m-5">
            <h1 className="text-4xl font-bold">{label}</h1>

            {editButton}
        </div>
    );
}

Header.propTypes = {
    label: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onEditToggle: PropTypes.func.isRequired,
};
