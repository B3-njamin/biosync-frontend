// src/data/mockData.js

export const historyData = [
  { time: '08:00', temperature: 22.5, humidity: 60, gas: 45 },
  { time: '09:00', temperature: 23.1, humidity: 62, gas: 50 },
  { time: '10:00', temperature: 24.5, humidity: 68, gas: 85 },
  { time: '11:00', temperature: 25.2, humidity: 70, gas: 110 },
  { time: '12:00', temperature: 26.0, humidity: 65, gas: 130 },
  { time: '13:00', temperature: 25.8, humidity: 60, gas: 90 },
  { time: '14:00', temperature: 24.5, humidity: 55, gas: 70 },
];

// src/data/mockData.js

export const alertsData = [
  { 
    id: 1, 
    time: '14:32', 
    date: '14 Nov 2026', 
    type: 'critical', 
    metric: 'Nivel de Gases', 
    value: '185 ppm', 
    message: 'Nivel de VOC extremadamente alto. Riesgo de toxicidad.' 
  },
  { 
    id: 2, 
    time: '11:15', 
    date: '14 Nov 2026', 
    type: 'warning', 
    metric: 'Temperatura', 
    value: '35.2 °C', 
    message: 'Temperatura por encima del umbral óptimo. Recomendable ventilar.' 
  },
  { 
    id: 3, 
    time: '09:05', 
    date: '14 Nov 2026', 
    type: 'warning', 
    metric: 'Humedad', 
    value: '22 %', 
    message: 'Humedad relativa inusualmente baja.' 
  }
];