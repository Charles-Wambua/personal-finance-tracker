import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


import Dashboard from './components/Dashboard/Dashboard';
import TransactionList from './components/Transactions/TransactionList';
import TransactionForm from './components/Transactions/TransactionForm';
import CategoryManager from './components/Transactions/CategoryManager';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';


import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Auth/privateRoute';  

function App() {
  return (
    <Router>
      <AuthProvider>  
        <div className="App">
          <Navbar />
          <Routes>
         
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/transactions" element={<PrivateRoute element={<TransactionList />} />} />
            <Route path="/add-transaction" element={<PrivateRoute element={<TransactionForm />} />} />
            <Route path="/categories" element={<PrivateRoute element={<CategoryManager />} />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
