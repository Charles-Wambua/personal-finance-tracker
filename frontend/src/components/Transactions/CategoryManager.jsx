import React, { useState, useEffect } from "react";
import { Modal, Button, Input, message, List, Select } from "antd";
import axios from "axios";

const { Option } = Select;
const API_BASE_URL = "http://127.0.0.1:8000/api/categories";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: token ? `Token ${token}` : "",
  },
});

const CategoryManager = () => {
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("expense");
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/");
      setCategories(res.data);

      console.log("Fetched categories:", res.data);
    } catch {
      message.error("Failed to load categories");
    }
  };

  const resetModal = () => {
    setCategoryName("");
    setCategoryType("expense");
    setEditingCategory(null);
    setVisible(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) return message.error("Category name is required");
    setLoading(true);

    const payload = { name: categoryName, type: categoryType };

    try {
      if (editingCategory) {
        await axiosInstance.put(`/${editingCategory.id}/`, payload);
        message.success("Category updated successfully");
      } else {
        await axiosInstance.post("/", payload);
        message.success("Category added successfully");
      }

      await fetchCategories();
      resetModal();
    } catch (err) {
      message.error("Operation failed");
      setLoading(false);
    }
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setCategoryType(category.type);
    setEditingCategory(category);
    setVisible(true);
  };

  const handleDeleteCategory = async (category) => {
    try {
      await axiosInstance.delete(`/${category.id}/`);
      setCategories(categories.filter((c) => c.id !== category.id));
      message.success("Category deleted");
    } catch {
      message.error("Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Categories</h2>

      <Button type="primary" shape="round" className="mb-4" onClick={() => setVisible(true)}>
        Add Category
      </Button>

      <List
        bordered
        dataSource={categories}
        renderItem={(item) => (
          <List.Item
            className="rounded-lg px-4 py-2"
            actions={[
              <Button type="link" onClick={() => handleEditCategory(item)}>Edit</Button>,
              <Button type="link" danger onClick={() => handleDeleteCategory(item)}>Delete</Button>,
            ]}
          >
            {item.name} - <span className="text-gray-500">{item.type}</span>
          </List.Item>
        )}
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={visible}
        onCancel={resetModal}
        onOk={handleSubmit}
        confirmLoading={loading}
        okText={editingCategory ? "Save" : "Add"}
        cancelButtonProps={{ shape: "round" }}
        okButtonProps={{ shape: "round" }}
      >
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="rounded-lg mb-3"
        />
        <Select
          value={categoryType}
          onChange={setCategoryType}
          className="w-full rounded-lg"
        >
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default CategoryManager;
