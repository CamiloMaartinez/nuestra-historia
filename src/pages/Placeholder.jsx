import { useTranslation } from 'react-i18next';

export default function Placeholder({ titulo }) {
  const { t } = useTranslation();
  return (
    <div className="placeholder-page">
      <span className="eyebrow">{t('placeholder.soon')}</span>
      <h1>{titulo}</h1>
    </div>
  );
}