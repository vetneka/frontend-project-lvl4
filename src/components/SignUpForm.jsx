import React, { useEffect, useRef } from 'react';

import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { has } from 'lodash';

import axios from 'axios';
import routes from '../routes';

import { signUpSchema } from '../validationSchemas';
import { useAuth } from '../hooks';

const SignUpForm = () => {
  const usernameRef = useRef();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleFormSubmit = async (values, props) => {
    try {
      const response = await axios.post(routes.signupPath(), values);

      logIn(response.data);
    } catch (error) {
      const { isAxiosError, response: { status } } = error;

      if (isAxiosError && status === 409) {
        props.resetForm();
        props.setErrors({ username: 'forms.errors.duplicateUser' });
        props.setValues({ ...values, password: '', passwordConfirmation: '' });
        usernameRef.current.select();
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={signUpSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleFormSubmit}
    >
      {({
        handleSubmit, handleChange, values, errors, isSubmitting, touched,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h1 className="h2 mb-3 text-center">{t('signup.header')}</h1>

          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label className="mb-1 ps-3 small">{t('forms.username.label')}</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
              isValid={has(touched, 'username') && !has(errors, 'username')}
              isInvalid={has(errors, 'username')}
              placeholder={t('forms.username.placeholder')}
              ref={usernameRef}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {t(errors.username)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label className="mb-1 ps-3 small">{t('forms.password.label')}</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              isValid={has(touched, 'password') && !has(errors, 'password')}
              isInvalid={has(errors, 'password')}
              placeholder={t('forms.password.placeholder')}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {t(errors.password)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-4"
            controlId="formGroupPasswordConfirmation"
          >
            <Form.Label className="mb-1 ps-3 small">{t('forms.passwordConfirmation.label')}</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="password"
              name="passwordConfirmation"
              onChange={handleChange}
              value={values.passwordConfirmation}
              isValid={has(touched, 'passwordConfirmation') && !has(errors, 'passwordConfirmation')}
              isInvalid={has(errors, 'passwordConfirmation')}
              placeholder={t('forms.passwordConfirmation.placeholder')}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {t(errors.passwordConfirmation)}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 rounded-pill"
            disabled={isSubmitting}
          >
            {t('signup.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
