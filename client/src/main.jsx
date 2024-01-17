import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'
import './index.css'
import { SessionAdminProvider } from './admin/SessionAdminContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <SessionProvider>
            <App />
          </SessionProvider>
        } />
        <Route path="/admin" element={
          <SessionAdminProvider>
            <Admin />
          </SessionAdminProvider>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

