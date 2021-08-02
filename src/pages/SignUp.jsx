import React from 'react';

import SignUpForm from '../components/SignUpForm.jsx';

import bgImgSignUp from '../../assets/bg-signup.png';

const SignUp = () => (
  <div className="h-100 row justify-content-center align-items-center">
    <div className="col-10 col-lg-8 col-xl-6">
      <div className="card">
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-6 d-flex align-items-center justify-content-center overflow-hidden">
              <img className="img-fluid" src={bgImgSignUp} alt="SignUp" />
            </div>
            <div className="col-12 col-md-6">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUp;
