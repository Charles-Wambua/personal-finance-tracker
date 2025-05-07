import React, { useEffect, useState, useMemo } from "react";
import { message } from "antd";
import SummaryCards from "./SummaryCards";
import ExpenseChart from "./ExpenseChart";
import { useAuth } from "../../context/AuthContext"
import axiosInstance from "../../utils/axiosInstance";

const API_BASE_URL = "http://127.0.0.1:8000/api";
//const API_BASE_URL = "http://192.158.30.180/api";

const Dashboard = () => {
  const { token, user } = useAuth(); 
  const [transactions, setTransactions] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [expensesByCategory, setExpensesByCategory] = useState({});


  const fetchTransactions = async (categoryMap) => {
    try {
      const res = await axiosInstance.get("/transactions/");
      const data = res.data;
      setTransactions(data);

      let totalIncome = 0;
      let totalExpenses = 0;
      const categoryTotals = {};

      data.forEach((tx) => {
        const amount = parseFloat(tx.amount || 0);
        const type = tx.type;

        if (type === "income") {
          totalIncome += amount;
        } else if (type === "expense") {
          totalExpenses += amount;
          const categoryId = tx.category;
          const categoryName = categoryMap[categoryId] || "Uncategorized";
          categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
        }
      });

      setIncome(totalIncome);
      setExpenses(totalExpenses);
      setExpensesByCategory(categoryTotals);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      message.error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        message.warning("Please log in to view the dashboard.");
        return;
      }

      try {
        const res = await axiosInstance.get("/categories/");
        const data = res.data;

        const map = {};
        data.forEach((cat) => {
          map[cat.id] = cat.name;
        });

        setCategoriesMap(map);
        await fetchTransactions(map);
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Failed to fetch categories");
      }
    };

    fetchData();
  }, [token, axiosInstance]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <SummaryCards income={income} expenses={expenses} />
      <ExpenseChart expensesByCategory={expensesByCategory} />
    </div>
  );
};

export default Dashboard;
