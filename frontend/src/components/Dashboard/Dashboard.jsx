import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import SummaryCards from "./SummaryCards";
import ExpenseChart from "./ExpenseChart";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: token ? `Token ${token}` : "",
  },
});

const Dashboard = () => {
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
      console.log("Fetched transactions:", data);

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
      try {
        const res = await axiosInstance.get("/categories/");
        const data = res.data;

        const map = {};
        data.forEach((cat) => {
          map[cat.id] = cat.name;
        });

        setCategoriesMap(map); // optional: for other uses
        await fetchTransactions(map); // pass directly to avoid async state issues
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Failed to fetch categories");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <SummaryCards income={income} expenses={expenses} />
      <ExpenseChart expensesByCategory={expensesByCategory} />
    </div>
  );
};

export default Dashboard;
