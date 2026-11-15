import React from 'react';
import { AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { alertsData } from '../data/mockData';

const Alerts = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <AlertCircle size={28} color="var(--accent)" />
        Registro de Alertas
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alertsData.map((alert) => {
          // Determinar colores e iconos según el nivel de alerta
          const isCritical = alert.type === 'critical';
          const bgColor = isCritical ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)';
          const borderColor = isCritical ? 'var(--status-danger)' : 'var(--status-warning)';
          const Icon = isCritical ? AlertCircle : AlertTriangle;

          return (
            <div key={alert.id} style={{ 
              backgroundColor: bgColor,
              borderLeft: `4px solid ${borderColor}`,
              padding: '1.5rem',
              borderRadius: '0 8px 8px 0',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}>
              
              <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-card)', borderRadius: '50%' }}>
                <Icon color={borderColor} size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0 }}>
                    Anomalía en {alert.metric}: <strong>{alert.value}</strong>
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} /> {alert.time} - {alert.date}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.4' }}>
                  {alert.message}
                </p>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;