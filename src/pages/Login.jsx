import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { iniciarSesion } from '../services/authService';
import './Login.css';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  async function manejarEnvio(e) {
    e.preventDefault();
    setCargando(true);
    setError(false);
    try {
      await iniciarSesion(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={manejarEnvio}>
        <h1 className="login-form__title">{t('auth.login_title')}</h1>

        <input
          type="email"
          placeholder={t('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('auth.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-form__error">{t('auth.error')}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? t('auth.logging_in') : t('auth.login_button')}
        </button>
      </form>
    </div>
  );
}