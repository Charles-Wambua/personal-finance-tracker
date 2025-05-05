import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select, DatePicker, message, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const TransactionList = ({ transactions, categories, onDelete }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm || filterCategory || filterDate) {
      handleSearch();
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchTerm, filterCategory, filterDate, transactions]);

  const handleSearch = () => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.amount.toString().includes(searchTerm) ||
          t.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((t) => t.category.id === filterCategory);
    }

    if (filterDate) {
      filtered = filtered.filter((t) =>
        dayjs(t.date).isSame(filterDate, "day")
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Loaded more transactions");
    }, 1000);
  };

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt) => <span className="text-gray-800 font-medium">${amt}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (cat) => (
        <Tag color="blue" className="rounded-md px-2 py-1 text-sm">
          {cat.name}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span className="text-gray-500">{dayjs(date).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span className={`text-xs px-2 py-1 rounded-full ${type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {type.toUpperCase()}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger type="text" onClick={() => onDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Transactions</h2>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
        <Input
          placeholder="Search amount or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          prefix={<SearchOutlined />}
          className="sm:w-1/3"
        />

        <Select
          placeholder="Filter by category"
          value={filterCategory}
          onChange={setFilterCategory}
          className="sm:w-1/4 w-full"
          allowClear
        >
          {/* {categories.map((cat) => (
            <Option key={cat.id} value={cat.id}>
              {cat.name}
            </Option>
          ))} */}
        </Select>

        <DatePicker
          onChange={(date) => setFilterDate(date)}
          className="sm:w-1/4 w-full"
          format="YYYY-MM-DD"
          placeholder="Filter by date"
        />

        <Button type="primary" onClick={handleSearch} className="sm:w-auto w-full">
          Filter
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table
          dataSource={filteredTransactions}
          columns={columns}
          rowKey="id"
          pagination={false}
          loading={loading}
          scroll={{ y: 400 }}
          onScroll={(e) => {
            if (
              e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight &&
              !loading
            ) {
              handleLoadMore();
            }
          }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default TransactionList;
