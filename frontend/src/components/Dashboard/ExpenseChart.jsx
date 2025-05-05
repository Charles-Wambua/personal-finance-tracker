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

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 20,
                    boxWidth: 20,
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md mt-6 w-full max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                Expenses by Category
            </h3>
            <div className="flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px]">
                <div className="w-full h-full relative">
                    <Pie data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ExpenseChart;
