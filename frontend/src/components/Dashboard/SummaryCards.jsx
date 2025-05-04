import React from "react";

const SummaryCards = ({ income, expenses }) => {
    const balance = income - expenses;

    const cards = [
        { label: "Income", value: income, color: "bg-green-100", text: "text-green-600" },
        { label: "Expenses", value: expenses, color: "bg-red-100", text: "text-red-600" },
        { label: "Balance", value: balance, color: "bg-blue-100", text: "text-blue-600" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className={`p-6 rounded-2xl shadow-md ${card.color} ${card.text} text-center transition-all`}
                >
                    <h2 className="text-xl font-semibold">{card.label}</h2>
                    <p className="text-2xl font-bold mt-2">${card.value.toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
