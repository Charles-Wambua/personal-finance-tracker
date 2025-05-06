import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && !user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.removeItem("token");
                setToken(null);
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            // const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
            const response = await axios.post("http://192.158.30.180/api/auth/login/", {
            email,
                password,
            });

            const receivedToken = response.data.token;
            const receivedUser = response.data.user;

            localStorage.setItem("token", receivedToken);
            localStorage.setItem("user", JSON.stringify(receivedUser));

            setToken(receivedToken);
            setUser(receivedUser);

            message.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            message.error("Login failed. Please try again.");
            console.error("Login error:", error);
        }
    };

    const register = async (formData) => {
        try {
            // await axios.post("http://127.0.0.1:8000/api/auth/register/", formData);
            await axios.post("http://192.158.30.180/api/auth/register/", formData);
            message.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            message.error("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
