import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Contador from '../components/Contador';
import FraseDelDia from '../components/FraseDelDia';
import Propuesta from '../components/Propuesta';
import FotoCollage from '../components/FotoCollage';
import Reveal from '../components/Reveal';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();

  const accesos = [
    { to: '/historia', label: t('nav.story'), desc: t('home.card_story_desc') },
    { to: '/fotos', label: t('nav.photos'), desc: t('home.card_photos_desc') },
    { to: '/cartas', label: t('nav.letters'), desc: t('home.card_letters_desc') },
    { to: '/recuerdos', label: t('nav.memories'), desc: t('home.card_memories_desc') },
  ];

  return (
    <div className="home">
      <section className="hero">
        <FotoCollage />
        <div className="hero__eyebrow eyebrow">{t('home.since')}</div>
        <h1 className="hero__title">
          {t('home.title_part1')} <em>{t('home.title_emphasis')}</em><br />
          {t('home.title_part2')}
        </h1>
        <p className="hero__subtitle">{t('home.subtitle')}</p>
      </section>

      <Contador />

      <FraseDelDia />

      <section className="acceso-rapido">
        {accesos.map((a, i) => (
          <Reveal key={a.to} delay={i * 80}>
            <Link to={a.to} className="tarjeta">
              <span className="tarjeta__label">{a.label}</span>
              <span className="tarjeta__desc">{a.desc}</span>
            </Link>
          </Reveal>
        ))}
      </section>

      <Propuesta />
    </div>
  );
}