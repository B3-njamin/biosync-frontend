import React, { useState } from 'react';
import { Thermometer, Droplet, Wind, Leaf, Plus, List, X, Clock } from 'lucide-react';
import SemiGauge from '../components/SemiGauge';
import HistoryChart from '../components/HistoryChart';

const Dashboard = () => {
  // Estado de Alertas
  const [alertas, setAlertas] = useState([
    { id: 1, texto: 'Humedad Baja - Hace 1 hr' },
    { id: 2, texto: 'Temperatura Alta - Hace 3 hrs' }
  ]);

  // Estado del Modo Ingreso
  const [modoIngreso, setModoIngreso] = useState(() => localStorage.getItem('bio_modo_ingreso') === 'true');
  
  // Estados para el registro de materiales
  const [mostrarInput, setMostrarInput] = useState(false);
  const [materiaInput, setMateriaInput] = useState('');
  const [registroMateria, setRegistroMateria] = useState(() => {
    return JSON.parse(localStorage.getItem('bio_registro_materia')) || [];
  });
  
  // Estado para controlar la ventana emergente (Modal) del historial completo
  const [verHistorialModal, setVerHistorialModal] = useState(false);

  // Función para confirmar alertas
  const confirmarAlerta = (id, e) => {
    e.preventDefault();
    setAlertas(alertas.filter(alerta => alerta.id !== id));
  };

  // Función para guardar el ingreso de materia
  const activarModoIngreso = (material) => {
    const textoMaterial = material.trim() === '' ? 'Ingreso genérico (Sin especificar)' : material;
    
    const nuevoRegistro = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      material: textoMaterial
    };

    // Guardamos TODO el historial, ya no lo cortamos a 4
    const nuevoHistorial = [nuevoRegistro, ...registroMateria];
    setRegistroMateria(nuevoHistorial);
    localStorage.setItem('bio_registro_materia', JSON.stringify(nuevoHistorial));

    setModoIngreso(true);
    localStorage.setItem('bio_modo_ingreso', 'true');
    setMostrarInput(false);
    setMateriaInput('');
  };

  const finalizarModoIngreso = () => {
    setModoIngreso(false);
    localStorage.setItem('bio_modo_ingreso', 'false');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
      
      {/* Sección Superior: Medidores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <SemiGauge label="Temperatura" value={modoIngreso ? 40.1 : 55.4} min={10} max={80} unit="°C" icon={Thermometer} color="#f59e0b" />
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <SemiGauge label="Humedad" value={modoIngreso ? 85.0 : 68.2} min={0} max={100} unit="%" icon={Droplet} color="#0ea5e9" />
        </div>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <SemiGauge label="Niveles de Gas" value={350} min={0} max={1000} unit="ppm" icon={Wind} color="#64748b" />
        </div>
      </div>

      {/* Sección Intermedia: Estado, Bitácora y Alertas */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        
        {/* Banner de Estado (Ocupa más espacio) */}
        <div style={{ flex: '2 1 350px', backgroundColor: modoIngreso ? '#f59e0b' : '#059669', padding: '1.5rem', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '1.2rem', transition: 'background-color 0.3s ease' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%', minWidth: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {modoIngreso ? '⏱' : '✓'}
            </div>
            <div>
                <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', opacity: 0.9, textTransform: 'uppercase' }}>Estado Actual del Compost</h3>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>
                  {modoIngreso ? 'CALIBRANDO - Nueva Materia Orgánica' : 'ÓPTIMO - Proceso Aeróbico Saludable'}
                </div>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
                  {modoIngreso ? 'Umbrales ajustados temporalmente.' : 'Variables dentro de los rangos normales.'}
                </p>
            </div>
        </div>

        {/* Tarjeta de Bitácora de Ingresos */}
        <div style={{ flex: '1 1 250px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <List size={16}/> Bitácora de Ingresos
            </h3>
            
            {!modoIngreso ? (
              mostrarInput ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Ej. Sandía, Hojas secas..." 
                    value={materiaInput}
                    onChange={(e) => setMateriaInput(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => activarModoIngreso(materiaInput)} style={{ flex: 1, backgroundColor: 'var(--accent)', color: '#000', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Registrar</button>
                    <button onClick={() => setMostrarInput(false)} style={{ flex: 1, backgroundColor: 'transparent', color: 'var(--text-muted)', border: '1px solid #334155', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setMostrarInput(true)} style={{ backgroundColor: 'var(--accent)', color: '#000', border: 'none', padding: '0.8rem', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Plus size={18} /> Agregar Materia
                </button>
              )
            ) : (
              <button onClick={finalizarModoIngreso} style={{ backgroundColor: 'transparent', color: 'var(--status-warning)', border: '1px solid var(--status-warning)', padding: '0.8rem', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Leaf size={18} /> Finalizar Calibración
              </button>
            )}

            {/* Resumen de los últimos 3 ingresos */}
            <div style={{ marginTop: '1rem', borderTop: '1px solid #334155', paddingTop: '0.8rem', fontSize: '0.85rem', flexGrow: 1 }}>
              {registroMateria.slice(0, 3).map(reg => (
                <div key={reg.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--accent)', opacity: 0.8, fontSize: '0.75rem' }}>{reg.fecha.split(' ')[1]}</span>
                  <span style={{ textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>{reg.material}</span>
                </div>
              ))}
            </div>

            {/* Botón para ver el modal del historial */}
            {registroMateria.length > 0 && (
              <button 
                onClick={() => setVerHistorialModal(true)}
                style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#0ea5e9', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center', width: '100%', padding: '0.5rem 0' }}
              >
                Ver historial completo ({registroMateria.length})
              </button>
            )}
        </div>

        {/* Tarjeta de Alertas Recientes (RECUPERADA) */}
        <div style={{ flex: '1 1 250px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Alertas Críticas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {alertas.length === 0 ? (
                  <span style={{ color: 'var(--status-optimal)' }}>✓ Todo en orden</span>
                ) : (
                  alertas.map(alerta => (
                    <div key={alerta.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                      <span style={{ opacity: modoIngreso ? 0.5 : 1 }}>{alerta.texto}</span>
                      <a href="#" onClick={(e) => confirmarAlerta(alerta.id, e)} style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '500', alignSelf: 'flex-start', fontSize: '0.85rem' }}>
                        [Confirmar]
                      </a>
                    </div>
                  ))
                )}
            </div>
        </div>

      </div>

      <HistoryChart />

      {/* MODAL: Historial Completo de Bitácora */}
      {verHistorialModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '500px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="var(--accent)" /> Historial Completo
              </h3>
              <button onClick={() => setVerHistorialModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ overflowY: 'auto', flexGrow: 1, paddingRight: '0.5rem' }}>
              {registroMateria.map(reg => (
                <div key={reg.id} style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', marginBottom: '0.8rem', borderLeft: '3px solid var(--accent)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{reg.fecha}</div>
                  <div style={{ color: 'var(--text-main)', fontWeight: '500' }}>{reg.material}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;