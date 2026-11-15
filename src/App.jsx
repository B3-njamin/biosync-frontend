import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Activity, Bell, Settings as SettingsIcon, Menu, X, User } from 'lucide-react';
import Perfil from './pages/Perfil';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <div className="app-container">
        
        {/* Botón superior para móviles */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid #334155' }} className="mobile-header">
           <button className="menu-toggle" onClick={toggleSidebar}>
             <Menu size={24} />
           </button>
           {/* Título solo visible en móvil cuando la barra colapsa */}
           <h1 style={{ color: 'var(--accent)', fontSize: '1.2rem', margin: 0, paddingLeft: '1rem' }} className="mobile-title">BioSync</h1>
        </div>

        {/* Overlay oscuro (solo móvil) */}
        {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

        {/* Barra Lateral */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: 'var(--accent)', fontSize: '1.5rem', margin: 0 }}>
              BioSync
            </h1>
            {/* Botón cerrar solo visible en móvil */}
            <button 
              className="menu-toggle" 
              style={{ padding: 0 }} 
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" onClick={() => setIsSidebarOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} /> Panel Principal
            </Link>
            <Link to="/alerts" onClick={() => setIsSidebarOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} /> Alertas
            </Link>
            <Link to="/perfil" onClick={() => setIsSidebarOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} /> Perfil
            </Link>
            <Link to="/settings" onClick={() => setIsSidebarOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SettingsIcon size={20} /> Configuración
            </Link>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;