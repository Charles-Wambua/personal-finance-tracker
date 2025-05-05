import React from "react";
import SummaryCards from "./SummaryCards";
import ExpenseChart from "./ExpenseChart";

const Dashboard = () => {
    const income = 5000;
    const expenses = 2600;
    const expensesByCategory = {
        Rent: 1200,
        Food: 600,
        Transport: 300,
        Entertainment: 250,
        Other: 250,
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            {/* Summary cards */}
            <SummaryCards income={income} expenses={expenses} />

            {/* Expense chart */}
            <ExpenseChart expensesByCategory={expensesByCategory} />
        </div>
    );
};

export default Dashboard;
