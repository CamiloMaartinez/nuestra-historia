import { useTranslation } from 'react-i18next';
import { eventosHistoria } from '../data/historia';
import Reveal from '../components/Reveal';
import Seal from '../components/Seal';
import './Historia.css';

export default function Historia() {
  const { t, i18n } = useTranslation();

  function formatearFecha(fechaISO) {
    return new Date(fechaISO + 'T00:00:00').toLocaleDateString(
      i18n.language === 'es' ? 'es-ES' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  }

  return (
    <div className="historia-page">
      <h1 className="historia-page__title">{t('story.title')}</h1>

      <div className="timeline">
        {eventosHistoria.map((evento, i) => (
          <Reveal key={evento.id} delay={i * 100} className="timeline__item">
            <div className="timeline__marcador">
              <Seal size={28} initials="♥" />
            </div>
            <div className="timeline__contenido">
              <span className="timeline__fecha eyebrow">{formatearFecha(evento.fecha)}</span>
              <h3 className="timeline__titulo">{t(evento.tituloKey)}</h3>
              <p className="timeline__desc">{t(evento.descKey)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}