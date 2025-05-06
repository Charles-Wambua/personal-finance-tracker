import React from "react";

const FilterBar = ({
    selectedMonth,
    onMonthChange,
    categories,
    onCategoryChange,
    transactionType,
    onTransactionTypeChange,
    dateRange,
    onDateRangeChange,
}) => {
    return (
        <div className="flex justify-between mb-4 space-x-4">
            <select
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="All">All Months</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                    <option key={index} value={month}>
                        {month}
                    </option>
                ))}
            </select>

            <select
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
=
            <select
                value={transactionType}
                onChange={(e) => onTransactionTypeChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="All">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
=
            <input
                type="date"
                value={dateRange[0] || ""}
                onChange={(e) => onDateRangeChange([e.target.value, dateRange[1]])}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            to
            <input
                type="date"
                value={dateRange[1] || ""}
                onChange={(e) => onDateRangeChange([dateRange[0], e.target.value])}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
};

export default FilterBar;
