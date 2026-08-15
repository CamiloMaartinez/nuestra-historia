import { useTranslation } from 'react-i18next';
import { fechasImportantes } from '../data/fechas';
import { calcularProximaFecha } from '../hooks/useProximaFecha';
import Reveal from '../components/Reveal';
import './Fechas.css';

export default function Fechas() {
  const { t, i18n } = useTranslation();

  function formatearFecha(fecha) {
    return fecha.toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric',
      month: 'long',
    });
  }

  function textoCuentaRegresiva(diasFaltantes) {
    if (diasFaltantes === 0) return t('dates.today');
    if (diasFaltantes === 1) return t('dates.tomorrow');
    return t('dates.days_left', { dias: diasFaltantes });
  }

  const fechasOrdenadas = [...fechasImportantes]
    .map((f) => ({ ...f, ...calcularProximaFecha(f.mes, f.dia) }))
    .sort((a, b) => a.diasFaltantes - b.diasFaltantes);

  return (
    <div className="fechas-page">
      <h1 className="fechas-page__title">{t('dates.title')}</h1>

      <div className="fechas-grid">
        {fechasOrdenadas.map((f, i) => (
          <Reveal key={f.id} delay={i * 100}>
            <div className={`fecha-card ${f.diasFaltantes === 0 ? 'fecha-card--hoy' : ''}`}>
              <span className="fecha-card__icono">{f.icono}</span>
              <h3 className="fecha-card__titulo">{t(f.labelKey)}</h3>
              <span className="fecha-card__fecha eyebrow">{formatearFecha(f.fecha)}</span>
              <span className="fecha-card__cuenta">{textoCuentaRegresiva(f.diasFaltantes)}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}