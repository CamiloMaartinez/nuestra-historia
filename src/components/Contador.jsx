import { useTranslation } from 'react-i18next';
import { useContador } from '../hooks/useContador';
import './Contador.css';

export default function Contador() {
  const { t } = useTranslation();
  const tiempo = useContador();

  const unidades = [
    { valor: tiempo.anios, label: t('counter.years') },
    { valor: tiempo.meses, label: t('counter.months') },
    { valor: tiempo.dias, label: t('counter.days') },
    { valor: tiempo.horas, label: t('counter.hours') },
    { valor: tiempo.minutos, label: t('counter.minutes') },
    { valor: tiempo.segundos, label: t('counter.seconds') },
  ];

  return (
    <section className="contador">
      <h2 className="contador__titulo">{t('counter.title')}</h2>
      <div className="contador__grid">
        {unidades.map((u) => (
          <div className="contador__unidad" key={u.label}>
            <span className="contador__valor">{u.valor}</span>
            <span className="contador__label eyebrow">{u.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}