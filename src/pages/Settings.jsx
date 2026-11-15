import React, { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = () => {
  const [tempThreshold, setTempThreshold] = useState(() => localStorage.getItem('bio_temp') || 30);
  const [humThreshold, setHumThreshold] = useState(() => localStorage.getItem('bio_hum') || 25);
  const [gasThreshold, setGasThreshold] = useState(() => localStorage.getItem('bio_gas') || 150);

  const [guardado, setGuardado] = useState(false);

  const handleSave = () => {
    localStorage.setItem('bio_temp', tempThreshold);
    localStorage.setItem('bio_hum', humThreshold);
    localStorage.setItem('bio_gas', gasThreshold);
    
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SettingsIcon size={28} color="var(--accent)" />
        Configuración del Sistema
      </h2>

      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        padding: '2rem', 
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <h3 style={{ color: 'var(--text-main)', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
          Umbrales de Alerta Crítica
        </h3>

        {/* Umbral de Temperatura */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)' }}>Temperatura Máxima (°C)</label>
            <span style={{ fontWeight: 'bold', color: 'var(--status-warning)' }}>{tempThreshold}°C</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="50" 
            value={tempThreshold} 
            onChange={(e) => setTempThreshold(e.target.value)}
            style={{ width: '100%', accentColor: 'var(--status-warning)' }}
          />
        </div>

        {/* Umbral de Humedad */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)' }}>Humedad Mínima (%)</label>
            <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{humThreshold}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={humThreshold} 
            onChange={(e) => setHumThreshold(e.target.value)}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
        </div>

        {/* Umbral de Gases (VOC) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)' }}>Gases Máximo (ppm)</label>
            <span style={{ fontWeight: 'bold', color: 'var(--status-danger)' }}>{gasThreshold} ppm</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="300" 
            value={gasThreshold} 
            onChange={(e) => setGasThreshold(e.target.value)}
            style={{ width: '100%', accentColor: 'var(--status-danger)' }}
          />
        </div>

        {/* Botón de Guardar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={handleSave}
            style={{
              backgroundColor: guardado ? 'var(--status-optimal)' : 'var(--accent)',
              color: '#000',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.3s'
            }}
          >
            <Save size={20} />
            {guardado ? '¡Guardado!' : 'Guardar Cambios'}
          </button>
          {guardado && <span style={{ color: 'var(--status-optimal)' }}>Los umbrales se han guardado localmente.</span>}
        </div>

      </div>
    </div>
  );
};

export default Settings;