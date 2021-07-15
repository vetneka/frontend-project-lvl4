import React from 'react';
import { Link } from 'react-router-dom';

import { LoginForm } from '../components/index.js';

import bgImgLogin from '../../assets/bg-login.png';

const Login = () => (
  <div className="h-100 d-flex row justify-content-center align-items-center">
    <div className="col-12 col-md-8">
      <div className="card">
        <div className="card-body row g-5 p-sm-5">
          <div className="col-6 mx-auto d-flex align-items-center overflow-hidden">
            <img className="img-fluid" src={bgImgLogin} alt="Login" />
          </div>
          <div className="col-12 col-md-6">
            <LoginForm />
          </div>
        </div>
        <div className="card-footer text-center py-3">
          <p className="m-0">
            Don&apos;t have an account yet?
            <Link to="/signup" className="ms-2">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
