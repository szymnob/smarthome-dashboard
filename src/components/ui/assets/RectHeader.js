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
import SubmitButton from "./Buttons";

export default function Header({ label, isEditing, onEditToggle, showEditButton = false }) {
    return (
        <div className="flex flex-col md:flex-row justify-between bg-neutral-50 shadow-md border-custom p-7 rounded-lg m-5">
            <h1 className="text-4xl font-bold mb-4 md:mb-0">{label}</h1>

            {/* Toggle Editing Button */}
            {showEditButton && (
                <div className="flex justify-end w-full md:w-auto ">
                    <SubmitButton
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={onEditToggle}
                        label={isEditing ? "Disable Editing" : "Enable Editing"}
                    >
                    </SubmitButton>
                </div>
            )}
        </div>
    );
}

Header.propTypes = {
    label: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onEditToggle: PropTypes.func.isRequired,
    showEditButton: PropTypes.bool.isRequired,
};
