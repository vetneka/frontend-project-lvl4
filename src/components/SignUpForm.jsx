import React from 'react';

import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

import { signUpSchema } from '../validationSchems.js';
import { useAuth } from '../hooks/index.js';

const SignUpForm = () => {
  const usernameRef = React.useRef();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  React.useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmitForm = async (values, props) => {
    try {
      const response = await axios.post(routes.signupPath(), values);

      logIn(response.data);
    } catch (error) {
      const { isAxiosError, response: { status } } = error;

      if (isAxiosError && status === 409) {
        props.resetForm();
        props.setErrors({ username: t('forms.errors.duplicateUser') });
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
      onSubmit={handleSubmitForm}
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
              isValid={touched.username && !errors.username}
              isInvalid={!!errors.username}
              placeholder={t('forms.username.placeholder')}
              ref={usernameRef}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {errors.username}
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
              isValid={touched.password && !errors.password}
              isInvalid={!!errors.password}
              placeholder={t('forms.password.placeholder')}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {errors.password}
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
              isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
              isInvalid={!!errors.passwordConfirmation}
              placeholder={t('forms.passwordConfirmation.placeholder')}
            />
            <Form.Control.Feedback type="invalid" className="ps-3">
              {errors.passwordConfirmation}
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
