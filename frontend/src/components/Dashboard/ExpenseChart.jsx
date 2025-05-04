import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expensesByCategory }) => {
    const labels = Object.keys(expensesByCategory);
    const dataValues = Object.values(expensesByCategory);

    const data = {
        labels,
        datasets: [
            {
                label: "Expenses by Category",
                data: dataValues,
                backgroundColor: [
                    "#60A5FA", "#F87171", "#34D399", "#FBBF24", "#A78BFA",
                ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md mt-6 sm:w-full md:w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Expenses by Category</h3>
            <div className="w-full h-72 sm:h-80 md:h-96 xl:h-80"> {/* Tailwind's responsive height classes */}
                <Pie data={data} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
        </div>
    );
};

export default ExpenseChart;
