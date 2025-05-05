import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";

const CategoryManager = ({ categories, onCategoryUpdate }) => {
    const [visible, setVisible] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAddCategory = () => {
        if (!categoryName) return message.error("Category name is required");
        onCategoryUpdate({ action: "add", category: categoryName });
        setCategoryName("");
        setVisible(false);
    };

    const handleEditCategory = (category) => {
        setCategoryName(category.name);
        setEditingCategory(category);
        setVisible(true);
    };

    const handleSaveCategory = () => {
        if (!categoryName) return message.error("Category name is required");
        onCategoryUpdate({ action: "edit", category: { ...editingCategory, name: categoryName } });
        setCategoryName("");
        setEditingCategory(null);
        setVisible(false);
    };

    const handleDeleteCategory = (category) => {
        onCategoryUpdate({ action: "delete", category });
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
            <Button type="primary" onClick={() => setVisible(true)} className="mb-4">
                Add Category
            </Button>

            <div className="space-y-4">
                {/* {categories.map((category) => (
                    <div key={category.id} className="flex justify-between items-center">
                        <span className="text-lg">{category.name}</span>
                        <div>
                            <Button type="link" onClick={() => handleEditCategory(category)}>
                                Edit
                            </Button>
                            <Button
                                type="link"
                                danger
                                onClick={() => handleDeleteCategory(category)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))} */}
            </div>

            <Modal
                title={editingCategory ? "Edit Category" : "Add Category"}
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={editingCategory ? handleSaveCategory : handleAddCategory}
            >
                <Input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                />
            </Modal>
        </div>
    );
};

export default CategoryManager;
