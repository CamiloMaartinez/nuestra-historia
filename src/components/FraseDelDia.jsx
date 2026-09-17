import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';
import './FraseDelDia.css';

function diaDelAnio() {
  const ahora = new Date();
  const inicioAnio = new Date(ahora.getFullYear(), 0, 0);
  const diferencia = ahora - inicioAnio;
  return Math.floor(diferencia / (1000 * 60 * 60 * 24));
}

export default function FraseDelDia() {
  const { t } = useTranslation();
  const frases = t('phrases', { returnObjects: true });
  const indice = diaDelAnio() % frases.length;

  return (
    <Reveal>
      <div className="frase-del-dia">
        <span className="frase-del-dia__eyebrow eyebrow">{t('home.daily_phrase_eyebrow')}</span>
        <p className="frase-del-dia__texto">"{frases[indice]}"</p>
      </div>
    </Reveal>
  );
}