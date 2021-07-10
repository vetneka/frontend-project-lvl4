import React from 'react';

import { SignUpForm } from '../components/index.js';

import bgImgSignUp from '../../assets/bg-signup.png';

const SignUp = () => {
  return (
    <div className="h-100 d-flex row justify-content-center align-items-center">
      <div className="col-12 col-md-8">
        <div className="card">
          <div className="card-body row g-5 p-sm-5">
            <div className="col-6 mx-auto d-flex align-items-center overflow-hidden">
              <img className="img-fluid" src={bgImgSignUp} alt="SignUp" />
            </div>
            <div className="col-12 col-md-6">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
