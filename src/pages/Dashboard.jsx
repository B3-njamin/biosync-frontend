import React, { useState } from 'react';
import { Thermometer, Droplet, Wind } from 'lucide-react';
import SemiGauge from '../components/SemiGauge';
import HistoryChart from '../components/HistoryChart';

const Dashboard = () => {
  const [alertas, setAlertas] = useState([
    { id: 1, texto: 'Humedad Baja - Hace 1 hr' },
    { id: 2, texto: 'Temperatura Alta - Hace 3 hrs' }
  ]);

  const confirmarAlerta = (id, e) => {
    e.preventDefault();
    setAlertas(alertas.filter(alerta => alerta.id !== id));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      
      {/* Sección Superior: Medidores */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <SemiGauge label="Temperatura" value={55.4} min={10} max={80} unit="°C" icon={Thermometer} color="#f59e0b" />
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <SemiGauge label="Humedad" value={68.2} min={0} max={100} unit="%" icon={Droplet} color="#0ea5e9" />
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <SemiGauge label="Niveles de Gas (MQ-135)" value={350} min={0} max={1000} unit="ppm" icon={Wind} color="#64748b" />
        </div>
      </div>

      {/* Sección Intermedia: Estado, Alertas y Resumen */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        marginBottom: '2rem', 
        flexWrap: 'wrap' 
      }}>
        
        {/* Banner de Estado Principal */}
        <div style={{ flex: '2 1 450px', backgroundColor: '#059669', padding: '1.5rem', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%', minWidth: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>✓</div>
            <div>
                <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', opacity: 0.9, textTransform: 'uppercase' }}>Estado Actual del Compost</h3>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>ÓPTIMO - Proceso Aeróbico Saludable</div>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>Todas las variables están dentro de los rangos normales. Bajo riesgo de putrefacción.</p>
            </div>
        </div>

        {/* Alertas Recientes */}
        <div style={{ flex: '1 1 200px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Alertas Recientes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {alertas.length === 0 ? (
                  <span style={{ color: 'var(--status-optimal)' }}>✓ Todo en orden</span>
                ) : (
                  alertas.map(alerta => (
                    <div key={alerta.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                      <span>{alerta.texto}</span>
                      <a href="#" onClick={(e) => confirmarAlerta(alerta.id, e)} style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '500', alignSelf: 'flex-start' }}>
                        [Confirmar]
                      </a>
                    </div>
                  ))
                )}
            </div>
        </div>

        {/* Resumen 24hr */}
        <div style={{ flex: '1 1 200px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Resumen (24hr)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                <span>Temp Máx: 55.4°C</span>
                <span>Hum Mín: 68.2%</span>
            </div>
        </div>

      </div>

      {/* Sección Inferior: Gráfico */}
      <HistoryChart />
      
    </div>
  );
};

export default Dashboard;