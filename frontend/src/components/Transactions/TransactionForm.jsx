import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;
const API_BASE_URL = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: token ? `Token ${token}` : "",
  },
});

const TransactionForm = ({ initialTransaction, onSuccess }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch failed", err);
      message.error("Failed to load categories");
    }
  };

  useEffect(() => {
    if (initialTransaction) {
      setIsEditing(true);
      form.setFieldsValue({
        amount: initialTransaction.amount,
        date: dayjs(initialTransaction.date),
        type: initialTransaction.type,
        category: initialTransaction.category.id,
      });
    }
  }, [initialTransaction, form]);

  const handleFormSubmit = async (values) => {
    const { amount, date, type, category } = values;

    if (!amount || !date || !type || !category) {
      return message.error("Please fill in all fields.");
    }

    const payload = {
      amount,
      date: date.format("YYYY-MM-DD"),
      type,
      category,
    };

    try {
      setLoading(true);

      if (isEditing) {
        await axiosInstance.put(`/transactions/${initialTransaction.id}/`, payload);
        message.success("Transaction updated successfully");
      } else {
        await axiosInstance.post("/transactions/", payload);
        message.success("Transaction added successfully");
      }

      form.resetFields();
      setIsEditing(false);
      onSuccess?.();
    } catch (err) {
        console.log("payload", payload);
      console.error("Submit failed", err);
      message.error("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {isEditing ? "Edit Transaction" : "Add Transaction"}
      </h2>
      <Form form={form} onFinish={handleFormSubmit} layout="vertical" className="space-y-4">
        <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
          <Input type="number" placeholder="Enter Amount" className="rounded-md" />
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker className="w-full rounded-md" />
        </Form.Item>

        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select placeholder="Select Type" className="rounded-md">
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select Category" className="rounded-md">
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full rounded-md py-2 font-semibold"
        >
          {isEditing ? "Update Transaction" : "Add Transaction"}
        </Button>
      </Form>
    </div>
  );
};

export default TransactionForm;
