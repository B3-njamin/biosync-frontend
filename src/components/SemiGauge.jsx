import React from 'react';

const SemiGauge = ({ label, value, min, max, unit, icon: Icon, color }) => {
  // Calcular el porcentaje y el ángulo de la aguja (de 0 a 180 grados)
  const percentage = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const angle = percentage * 180;
  // -90 apunta totalmente a la izquierda, 90 apunta a la derecha
  const rotation = angle - 90; 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>
        {label}
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
        
        {/* Icono a la izquierda */}
        {Icon && (
          <div style={{ 
            backgroundColor: 'rgba(128, 128, 128, 0.15)', 
            padding: '1.2rem', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color 
          }}>
            <Icon size={35} />
          </div>
        )}

        {/* Medidor SVG a la derecha */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '220px', margin: '0 auto' }}>
          <svg viewBox="0 0 200 120" style={{ width: '100%', overflow: 'visible' }}>
            
            {/* Banda Izquierda (Bajo) - Naranja */}
            <path d="M 20 100 A 80 80 0 0 1 60 30.72" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" />
            
            {/* Banda Central (Óptimo) - Verde */}
            <path d="M 60 30.72 A 80 80 0 0 1 140 30.72" fill="none" stroke="#10b981" strokeWidth="12" />
            
            {/* Banda Derecha (Alto) - Rojo */}
            <path d="M 140 30.72 A 80 80 0 0 1 180 100" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />

            {/* Etiquetas de Rangos */}
            <text x="25" y="115" fontSize="10" fontWeight="bold" fill="var(--text-muted)" textAnchor="middle">BAJO</text>
            <text x="100" y="15" fontSize="10" fontWeight="bold" fill="var(--text-muted)" textAnchor="middle">ÓPTIMO</text>
            <text x="175" y="115" fontSize="10" fontWeight="bold" fill="var(--text-muted)" textAnchor="middle">ALTO</text>

            {/* Aguja Analógica */}
            <g transform={`rotate(${rotation}, 100, 100)`}>
              {/* Cuerpo de la aguja */}
              <polygon points="96,100 104,100 100,25" fill="var(--text-main)" />
              {/* Eje central */}
              <circle cx="100" cy="100" r="7" fill="var(--text-main)" />
              <circle cx="100" cy="100" r="3" fill="var(--bg-card)" />
            </g>
          </svg>
          
          {/* Valor Numérico Central */}
          <div style={{ textAlign: 'center', marginTop: '-15px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{value}</span>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '2px' }}>{unit}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SemiGauge;