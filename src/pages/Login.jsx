import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm.jsx';

import bgImgLogin from '../../assets/bg-login.png';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100 row justify-content-center align-items-center">
      <div className="col-10 col-lg-8 col-xl-6">
        <div className="card">
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-6 d-flex align-items-center justify-content-center overflow-hidden">
                <img className="img-fluid" src={bgImgLogin} alt="Sign in" />
              </div>
              <div className="col-12 col-md-6">
                <LoginForm />
              </div>
            </div>
          </div>
          <div className="card-footer text-center py-3">
            <p className="m-0">
              {t('login.noAccount')}
              <Link to="/signup" className="ms-2">{t('login.signup')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
