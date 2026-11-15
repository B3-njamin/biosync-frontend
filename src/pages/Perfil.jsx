import React, { useState } from 'react';
import { User, Mail, Bell, Shield, Smartphone, Check } from 'lucide-react';

const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    nombre: 'Operador Principal',
    planta: 'Planta BioSync Centro',
    email: 'admin@biosync.local',
    telefono: '+56 9 1234 5678'
  });

  const toggleEdit = () => {
    if (isEditing) {
      alert('Datos de perfil actualizados.');
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = () => {
    alert('Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: 'var(--text-main)' }}>Perfil y Preferencias</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Tarjeta de Información Interactiva */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'var(--accent)', padding: '1rem', borderRadius: '50%', color: 'var(--bg-dark)' }}>
              <User size={40} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
              {isEditing ? (
                <>
                  <input value={userData.nombre} onChange={e => setUserData({...userData, nombre: e.target.value})} style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--accent)', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)' }} />
                  <input value={userData.planta} onChange={e => setUserData({...userData, planta: e.target.value})} style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--accent)', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)' }} />
                </>
              ) : (
                <>
                  <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem' }}>{userData.nombre}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>{userData.planta}</p>
                </>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
              <Mail size={18} color="var(--text-muted)" />
              {isEditing ? (
                <input value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--accent)', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)', flex: 1 }} />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
              <Smartphone size={18} color="var(--text-muted)" />
              {isEditing ? (
                <input value={userData.telefono} onChange={e => setUserData({...userData, telefono: e.target.value})} style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--accent)', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)', flex: 1 }} />
              ) : (
                <span>{userData.telefono}</span>
              )}
            </div>
          </div>
          
          <button onClick={toggleEdit} style={{ marginTop: '2rem', width: '100%', padding: '0.8rem', backgroundColor: isEditing ? 'var(--status-optimal)' : 'transparent', border: `1px solid ${isEditing ? 'var(--status-optimal)' : 'var(--accent)'}`, color: isEditing ? '#000' : 'var(--accent)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            {isEditing ? <><Check size={20}/> Guardar Información</> : 'Editar Información'}
          </button>
        </div>

        {/* Tarjeta de Preferencias de Notificación */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            <Bell size={24} color="var(--accent)" />
            <h3 style={{ margin: 0 }}>Notificaciones</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-main)' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>Alertas Críticas (SMS)</span>
              <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>Resumen Diario (Email)</span>
              <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>Notificaciones Push Web</span>
              <input type="checkbox" style={{ transform: 'scale(1.2)' }} />
            </label>
          </div>
        </div>

        {/* Tarjeta de Seguridad */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            <Shield size={24} color="var(--status-optimal)" />
            <h3 style={{ margin: 0 }}>Seguridad</h3>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Último inicio de sesión: Hace 2 horas desde 192.168.1.105
          </p>
          
          <button onClick={handlePasswordChange} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--bg-dark)', border: '1px solid #334155', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
            Cambiar Contraseña
          </button>
        </div>

      </div>
    </div>
  );
};

export default Perfil;