import PropTypes from "prop-types";

const DAYS = [
    { 1: "M" },
    { 2: "T" },
    { 3: "W" },
    { 4: "R" },
    { 5: "F" },
    { 6: "S" },
    { 7: "U" },
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
                const dayLabel = dayObj[dayValue];

                return (
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
                    >
                        {dayLabel}
                    </button>
                );
            })}
        </div>
    );
}

ToggleDays.propTypes = {
    value: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func.isRequired,
}
