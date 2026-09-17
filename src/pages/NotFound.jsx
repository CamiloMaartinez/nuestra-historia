import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NotFound.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <span className="eyebrow">404</span>
      <h1 className="not-found__title">{t('notFound.title')}</h1>
      <p className="not-found__desc">{t('notFound.desc')}</p>
      <Link to="/" className="not-found__cta">
        {t('notFound.cta')}
      </Link>
    </div>
  );
}
