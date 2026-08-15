import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { cerrarSesion } from '../services/authService';
import Seal from './Seal';
import './Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();

  const enlaces = [
    { to: '/', label: t('nav.home') },
    { to: '/historia', label: t('nav.story') },
    { to: '/fotos', label: t('nav.photos') },
    { to: '/cartas', label: t('nav.letters') },
    { to: '/recuerdos', label: t('nav.memories') },
    { to: '/fechas', label: t('nav.dates') },
  ];

  const cambiarIdioma = (idioma) => {
    i18n.changeLanguage(idioma);
    localStorage.setItem('idioma', idioma);
  };

  async function manejarLogout() {
    await cerrarSesion();
    navigate('/');
  }

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">
        <Seal size={36} initials="C&L" />
        <span>{t('nav.brand')}</span>
      </NavLink>

      <nav className="navbar__links">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.to}
            to={enlace.to}
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            {enlace.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__lang">
        <button
          className={i18n.language === 'es' ? 'lang-btn lang-btn--active' : 'lang-btn'}
          onClick={() => cambiarIdioma('es')}
        >
          ES 🇪🇸
        </button>
        <button
          className={i18n.language === 'en' ? 'lang-btn lang-btn--active' : 'lang-btn'}
          onClick={() => cambiarIdioma('en')}
        >
          EN 🇺🇸
        </button>

        {estaAutenticado ? (
          <button className="lang-btn" onClick={manejarLogout}>
            {t('auth.logout')}
          </button>
        ) : (
          <NavLink to="/login" className="lang-btn">
            {t('auth.login_link')}
          </NavLink>
        )}
      </div>
    </header>
  );
}