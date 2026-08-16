import { useTranslation } from 'react-i18next';

const AnyPage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
      <button>{t('home.exploreStates')}</button>
    </div>
  );
};