import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import dayjs from "dayjs";

const TransactionForm = ({ categories, onSubmit, initialTransaction }) => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

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

    const handleFormSubmit = (values) => {
        const { amount, date, type, category } = values;

        if (!amount || !date || !type || !category) {
            return message.error("Please fill in all fields.");
        }

        const transaction = {
            ...initialTransaction,
            amount,
            date: date.format("YYYY-MM-DD"),
            type,
            category,
        };

        onSubmit(transaction);
        form.resetFields();
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {isEditing ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <Form
                form={form}
                onFinish={handleFormSubmit}
                layout="vertical"
                className="space-y-4"
            >
                <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
                    <Input
                        type="number"
                        placeholder="Enter Amount"
                        className="rounded-md"
                    />
                </Form.Item>

                <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                    <DatePicker className="w-full rounded-md" />
                </Form.Item>

                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select placeholder="Select Type" className="rounded-md">
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select placeholder="Select Category" className="rounded-md">
                        {/* {categories.map((category) => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))} */}
                    </Select>
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full rounded-md py-2 font-semibold"
                >
                    {isEditing ? "Update Transaction" : "Add Transaction"}
                </Button>
            </Form>
        </div>
    );
};

export default TransactionForm;
