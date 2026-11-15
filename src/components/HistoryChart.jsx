import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { historyData } from '../data/mockData';

const HistoryChart = () => {
  return (
    <div style={{ 
      backgroundColor: 'var(--bg-card)', 
      padding: '2rem', 
      borderRadius: '12px', 
      marginTop: '2rem'
    }}>
      <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>Tendencias Históricas (Últimas Horas)</h3>
      
      {/* Contenedor con scroll horizontal para móviles */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        {/* Contenedor que fuerza el ancho mínimo para evitar que se comprima */}
        <div style={{ minWidth: '600px', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-main)' }}
              />
              <Legend verticalAlign="top" height={40} wrapperStyle={{ paddingBottom: '20px' }}/>
              
              <Line type="monotone" dataKey="temperature" name="Temp (°C)" stroke="var(--status-optimal)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="humidity" name="Humedad (%)" stroke="var(--accent)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="gas" name="Gases (ppm)" stroke="var(--status-warning)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
};

export default HistoryChart;