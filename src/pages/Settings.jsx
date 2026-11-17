import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Info, History } from 'lucide-react';

const Settings = () => {
  const [tempThreshold, setTempThreshold] = useState(() => localStorage.getItem('bio_temp') || 30);
  const [humThreshold, setHumThreshold] = useState(() => localStorage.getItem('bio_hum') || 25);
  const [gasThreshold, setGasThreshold] = useState(() => localStorage.getItem('bio_gas') || 150);
  const modoIngresoActivo = localStorage.getItem('bio_modo_ingreso') === 'true';
  const [guardado, setGuardado] = useState(false);

  // NUEVO ESTADO: Historial de cambios
  const [historialCambios, setHistorialCambios] = useState(() => {
    return JSON.parse(localStorage.getItem('bio_historial_config')) || [];
  });

  const handleSave = () => {
    localStorage.setItem('bio_temp', tempThreshold);
    localStorage.setItem('bio_hum', humThreshold);
    localStorage.setItem('bio_gas', gasThreshold);
    
    // Crear registro del cambio
    const nuevoRegistro = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      detalle: `T: ${tempThreshold}°C | H: ${humThreshold}% | G: ${gasThreshold}ppm`,
      modo: modoIngresoActivo ? 'Modo Calibración' : 'Normal'
    };

    // Guardar historial (últimos 5)
    const nuevoHistorial = [nuevoRegistro, ...historialCambios].slice(0, 5);
    setHistorialCambios(nuevoHistorial);
    localStorage.setItem('bio_historial_config', JSON.stringify(nuevoHistorial));

    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SettingsIcon size={28} color="var(--accent)" />
        Configuración del Sistema
      </h2>

      {modoIngresoActivo && (
        <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #f59e0b', padding: '1rem', marginBottom: '2rem', borderRadius: '4px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Info color="#f59e0b" size={24} />
          <div>
            <h4 style={{ margin: '0 0 0.3rem 0', color: '#f59e0b' }}>Modo de Ingreso Activo</h4>
            <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.9rem' }}>
              Los parámetros que guardes ahora quedarán registrados como ajuste de calibración.
            </p>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--text-main)', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
          Umbrales de Alerta Crítica
        </h3>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)' }}>Temperatura Máxima (°C)</label>
            <span style={{ fontWeight: 'bold', color: 'var(--status-warning)' }}>{tempThreshold}°C</span>
          </div>
          <input type="range" min="10" max="50" value={tempThreshold} onChange={(e) => setTempThreshold(e.target.value)} style={{ width: '100%', accentColor: 'var(--status-warning)' }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)' }}>Humedad Mínima (%)</label>
            <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{humThreshold}%</span>
          </div>
          <input type="range" min="0" max="100" value={humThreshold} onChange={(e) => setHumThreshold(e.target.value)} style={{ width: '100%', accentColor: 'var(--accent)' }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)' }}>Gases Máximo (ppm)</label>
            <span style={{ fontWeight: 'bold', color: 'var(--status-danger)' }}>{gasThreshold} ppm</span>
          </div>
          <input type="range" min="50" max="300" value={gasThreshold} onChange={(e) => setGasThreshold(e.target.value)} style={{ width: '100%', accentColor: 'var(--status-danger)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={handleSave}
            style={{ backgroundColor: guardado ? 'var(--status-optimal)' : 'var(--accent)', color: '#000', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.3s' }}
          >
            <Save size={20} /> {guardado ? '¡Guardado!' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      {/* NUEVO: Historial de Cambios */}
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px' }}>
        <h3 style={{ color: 'var(--text-main)', borderBottom: '1px solid #334155', paddingBottom: '1rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={20} /> Historial de Modificaciones
        </h3>
        
        {historialCambios.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No hay registros de cambios recientes.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {historialCambios.map(registro => (
              <div key={registro.id} style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>{registro.fecha}</span>
                  <span style={{ backgroundColor: registro.modo === 'Normal' ? '#334155' : '#f59e0b', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                    {registro.modo}
                  </span>
                </div>
                <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                  {registro.detalle}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Settings;