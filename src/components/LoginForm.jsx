import React from 'react';

import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from '../routes';

import { loginSchema } from '../validationSchems.js';
import { useAuth } from '../hooks/index.js';

const LoginForm = () => {
  const usernameRef = React.useRef();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  React.useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmitForm = async (values, props) => {
    try {
      const response = await axios.post(routes.loginPath(), values);

      logIn(response.data);
    } catch (error) {
      const { isAxiosError, response: { status } } = error;

      if (isAxiosError && status === 401) {
        props.setErrors({ username: true, password: t('forms.errors.login') });
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
      onSubmit={handleSubmitForm}
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
              isInvalid={!!errors.username}
              placeholder={t('forms.login.placeholder')}
              ref={usernameRef}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {errors.username}
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
              isInvalid={!!errors.password}
              placeholder={t('forms.password.placeholder')}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {errors.password}
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
