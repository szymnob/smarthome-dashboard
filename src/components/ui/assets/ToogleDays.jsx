import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

const DAYS = [
    { 1: ["M", "Monday"] },
    { 2: ["T", "Tuesday"] },
    { 3: ["W", "Wednesday"] },
    { 4: ["R", "Thursday"] },
    { 5: ["F", "Friday"] },
    { 6: ["S", "Saturday"] },
    { 7: ["U", "Sunday"] },
];

export default function ToggleDays({ value = [], onChange }) {

    const toggleDay = (dayValue) => {
        const newSelectedDays = value.includes(dayValue)
            ? value.filter((day) => day !== dayValue)
            : [...value, dayValue];

        onChange(newSelectedDays);
    };

    return (
        <div className="flex space-x-2 p-2">
            {DAYS.map((dayObj) => {
                const dayValue = parseInt(Object.keys(dayObj)[0]);
                const dayLabel = dayObj[dayValue][0];
                const dayName = dayObj[dayValue][1];

                return (
                    <>
                    <button
                        key={dayValue}
                        onClick={() => toggleDay(dayValue)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200
                            ${
                            value.includes(dayValue)
                                ? "bg-purple-700 text-white border-purple-700 hover:bg-purple-400 hover:border-purple-400"
                                : "border-purple-700 text-purple-700 hover:bg-purple-300 hover:border-purple-400"
                        }`}
                        aria-label={`Day ${dayValue}`}
                        id={`day-${dayValue}`}
                    >
                        {dayLabel}
                    </button>
                    <Tooltip anchorSelect={`#day-${dayValue}`} content={dayName} place="top" delayShow={500} />
                    </>
                );
            })}
        </div>
    );
}

ToggleDays.propTypes = {
    value: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func.isRequired,
}
