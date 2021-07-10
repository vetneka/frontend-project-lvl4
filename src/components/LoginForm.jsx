import React from 'react';
import { Formik, Form } from 'formik';

import TextInput from './TextInput.jsx';
import { loginSchema } from '../validationSchems.js';

const LoginForm = () => {
  return (
    <Formik 
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => {
        return (
          <Form className="row g-3">
            <h1 className="h2 mb-0 text-center">Sign in</h1>

            <div className="col-12 position-relative">
              <TextInput type="text" label="Name" name="username" placeholder="Type you name..." />
            </div>

            <div className="col-12 mb-3 position-relative">
              <TextInput type="password" label="Password" name="password" placeholder="Type you password..." />
            </div>

            <div className="col-12 text-center">
              <button
                className="btn btn-primary rounded-pill"
                type="submit"
                disabled={!props.isValid}
              >
                Sign in
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
