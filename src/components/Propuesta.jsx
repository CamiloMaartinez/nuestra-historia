import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';
import './Propuesta.css';

export default function Propuesta() {
  const { t } = useTranslation();
  return (
    <Reveal>
      <section className="propuesta">
        <span className="propuesta__eyebrow eyebrow">03.01.2026</span>
        <p className="propuesta__texto">{t('home.proposal')}</p>
      </section>
    </Reveal>
  );
}