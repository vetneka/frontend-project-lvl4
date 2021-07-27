import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column">
      <h1 className="fs-hero lh-1">{t('404.header')}</h1>
      <p className="fs-2 mb-4">{t('404.description')}</p>
      <Link to="/" className="btn btn-primary btn-lg rounded-pill">
        {t('404.button')}
      </Link>
    </div>
  );
};

export default NotFound;
