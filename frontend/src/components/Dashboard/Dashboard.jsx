import React, { useState } from "react";
import SummaryCards from "./SummaryCards";
import ExpenseChart from "./ExpenseChart";
import FilterBar from "./FilterBar";

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState("May");

    // Dummy data for demo
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
            <FilterBar selectedMonth={selectedMonth} onChange={setSelectedMonth} />
            <SummaryCards income={income} expenses={expenses} />
            <ExpenseChart expensesByCategory={expensesByCategory} />
        </div>
    );
};

export default Dashboard;
