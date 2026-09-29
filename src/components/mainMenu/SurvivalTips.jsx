import React from 'react';
import GameIcon from '../GameIcon';

export default function SurvivalTips() {
  const survivalTips = [
    {
      icon: 'treasure-map',
      title: 'Rutas y Teletransporte',
      text: 'Utiliza el Mapa Interactivo para localizar los pilares arcanos y desbloquear viajes rápidos por todo el territorio.'
    },
    {
      icon: 'hammer-drop',
      title: 'Crafteo Eficiente',
      text: 'Agrega múltiples recetas a la Calculadora de Crafteo para ver la suma total de menas brutas requeridas.'
    },
    {
      icon: 'shield',
      title: 'Optimización de Equipo',
      text: 'Prueba diferentes combinaciones en el Simulador de Equipo para maximizar la absorción de daño antes de un boss.'
    }
  ];

  return (
    <section className="menu-tips-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-main-title">CONSEJOS DE SUPERVIVENCIA</h2>
          <p className="section-main-desc">Recomendaciones esenciales para aventureros de Ashenfall</p>
        </div>
      </div>

      <div className="menu-tips-grid">
        {survivalTips.map((tip, idx) => (
          <div key={idx} className="tip-card">
            <div className="tip-header">
              <span className="tip-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <GameIcon name={tip.icon} size={22} color="var(--gold-400)" />
              </span>
              <h4 className="tip-title">{tip.title}</h4>
            </div>
            <p className="tip-text">{tip.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
