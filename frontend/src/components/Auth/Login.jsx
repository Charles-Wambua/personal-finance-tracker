import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom"; // For redirection

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Navigation hook

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            message.success("Login successful!");
            navigate("/dashboard"); // Redirect on success
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.detail || "Login failed!");
                console.log("frontend data sent to backend", { email, password });
            } else {
                message.error("An error occurred, please try again.");
            }
            console.log("Error logging in:", error);
        } finally {
            setLoading(false);
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
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Welcome Back 👋
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/60 backdrop-blur-sm"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/60 backdrop-blur-sm"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all flex justify-center items-center"
                    >
                        {loading ? <Spin size="small" /> : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-500 text-center">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
