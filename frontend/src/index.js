import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@ant-design/v5-patch-for-react-19';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
