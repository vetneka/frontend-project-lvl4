import React, { useEffect, useRef } from 'react';

import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { has } from 'lodash';

import axios from 'axios';
import routes from '../routes';

import { loginSchema } from '../validationSchemas';
import { useAuth } from '../hooks';

const LoginForm = () => {
  const usernameRef = useRef();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleFormSubmit = async (values, props) => {
    try {
      const response = await axios.post(routes.loginPath(), values);

      logIn(response.data);
    } catch (error) {
      const { isAxiosError, response: { status } } = error;

      if (isAxiosError && status === 401) {
        props.setErrors({ username: '', password: 'forms.errors.login' });
        props.setValues({ ...values, password: '' });
        usernameRef.current.select();
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={loginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleFormSubmit}
    >
      {({
        handleSubmit, handleChange, values, errors, isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h1 className="h2 mb-3 text-center">{t('login.header')}</h1>

          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label className="mb-1 ps-3 small">{t('forms.login.label')}</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
              isInvalid={has(errors, 'username')}
              placeholder={t('forms.login.placeholder')}
              ref={usernameRef}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {t(errors.username)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label className="mb-1 ps-3 small">{t('forms.password.label')}</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              isInvalid={has(errors, 'password')}
              placeholder={t('forms.password.placeholder')}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {t(errors.password)}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 rounded-pill"
            disabled={isSubmitting}
          >
            {t('login.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
