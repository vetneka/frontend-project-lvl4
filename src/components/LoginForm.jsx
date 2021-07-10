import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

import cn from 'classnames';

import AuthContext from '../contexts/index.js';
import routes from '../routes';

import TextInput from './TextInput.jsx';
import { loginSchema } from '../validationSchems.js';

const buildInputClassName = (error) => cn('form-control rounded-pill', {
  'is-invalid': error,
});

const LoginForm = () => {
  const usernameRef = React.useRef();
  const { logIn } = React.useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Formik 
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={loginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, props) => {
        try {
          const { from } = location.state || { from: { pathname: '/' } };
          const response = await axios.post(routes.loginPath(), values);
          
          logIn(response.data);
          history.replace(from);
        } catch (error) {
          const { isAxiosError, response: { status } } = error;

          if (isAxiosError && status === 401) {
            props.setErrors({ username: true, password: 'Invalid name or password' })
            props.setValues({ ...values, password: '' });
            usernameRef.current.select();
          }
        }
      }}
    >
      {(props) => {
        return (
          <Form className="row g-3">
            <h1 className="h2 mb-0 text-center">Sign in</h1>

            <div className="col-12 position-relative">
              <label className="form-label ps-3" htmlFor="username">Username</label>
              <Field className={buildInputClassName(props.errors.username)} id="username" name="username" type="text" innerRef={usernameRef} />
              {
                (props.errors.username)
                  ? <div className="invalid-feedback small">{props.errors.username}</div>
                  : null
              }
            </div>

            <div className="col-12 position-relative">
              <label className="form-label ps-3" htmlFor="password">Password</label>
              <Field className={buildInputClassName(props.errors.password)} id="password" name="password" type="password" />
              {
                (props.errors.password)
                  ? <div className="invalid-feedback small">{props.errors.password}</div>
                  : null
              }
            </div>

            <div className="col-12 text-center">
              <button
                className="btn btn-primary rounded-pill"
                type="submit"
                disabled={props.isSubmitting}
              >
                Sign in
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};

export default LoginForm;
