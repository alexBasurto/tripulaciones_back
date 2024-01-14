import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'
import SuperAdmin from './superadmin/SuperAdmin.jsx'
import './index.css'
import { SessionAdminProvider } from './admin/SessionAdminContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionProvider>
      <SessionAdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
        </Routes>
      </BrowserRouter>
      </SessionAdminProvider>
    </SessionProvider>
  </React.StrictMode>,
)
