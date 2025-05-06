import React, { useState } from "react";
import { motion } from "framer-motion";
import { message, Button } from "antd";
import { useNavigate } from "react-router-dom";  
import { useAuth } from "../../context/AuthContext";  

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth(); 
    const navigate = useNavigate();  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formData.password !== formData.confirm_password) {
            message.error("Passwords do not match.");
            setIsSubmitting(false);
            return;
        }

        try {
            await register(formData);  
            message.success("Registration successful!");
            navigate("/login");  
        } catch (error) {
            message.error("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
            <motion.div
                className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/60 backdrop-blur-sm"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/60 backdrop-blur-sm"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/60 backdrop-blur-sm"
                        required
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/60 backdrop-blur-sm"
                        required
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </form>
                <p className="mt-4 text-sm text-gray-500 text-center">
                    Already registered?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
