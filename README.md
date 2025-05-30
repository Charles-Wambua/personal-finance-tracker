# 💰 Personal Finance Tracker

A simple full-stack web application to help users track their income and expenses by category, get insightful summaries, and manage personal finances effectively.

## 🚀 Features

### ✅ Core Functionality
- **User Authentication** (using Context API + DRF Auth)
- **Track Transactions** (Income & Expenses)
- **Categorize Transactions**
- **View Dashboard** with:
    - Total Income
    - Total Expenses
    - Net Balance

### 🔍 Filtering & Management
- Filter transactions by:
    - **Date Range**
    - **Transaction Type**
    - **Category**
- Add / Edit / Delete transactions and categories

### 📈 Visualization
- Chart (Pie) showing **expenses by category**

### ⚙️ Additional Features (Bonus)
- ✅ **Pagination** for transaction list
- ✅ **Recurring transaction flag** (Mark transactions as recurring)
- ✅ **AuthContext** using React Context API
- Clean and responsive UI using **React + Tailwind**

---

## 🛠️ Tech Stack

### Backend
- **Django**
- **Django REST Framework**
- **DRF Auth** 
- **PostgreSQL** 

### Frontend
- **React**
- **Context API**
- **React Router**
- **Tailwind CSS**
- **Chart.js**

---

## 🌐 Live Demo

The platform is hosted on **Google Cloud Platform (GCP)** using **Nginx (containerized)** and **Gunicorn** to keep the backend running. You can view it live at:  
[http://192.158.30.180/](http://192.158.30.180/)

### Test Account Credentials
- **Email**: testuser@gmail.com  
- **Password**: test2025  

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Charles-Wambua/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Backend Setup
```bash
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

Built with ❤️ by Charles
