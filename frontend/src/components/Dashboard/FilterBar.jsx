import React from "react";

const FilterBar = ({ selectedMonth, onChange }) => {
    return (
        <div className="flex justify-end mb-4">
            <select
                value={selectedMonth}
                onChange={(e) => onChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {[
                    "January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October",
                    "November", "December"
                ].map((month, index) => (
                    <option key={index} value={month}>
                        {month}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;
