import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';

import { Formik } from 'formik';

import { useSocket } from '../hooks';

const AddMessageForm = (props) => {
  const { currentChannelId, currentUsername } = props;
  const inputMessageRef = useRef();
  const { sendMessage } = useSocket();
  const { t } = useTranslation();

  const handleFormSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    const message = {
      body: values.message,
      channelId: currentChannelId,
      username: currentUsername,
    };

    setSubmitting(true);
    sendMessage(
      message,
      () => {
        setSubmitting(false);
        resetForm();
        inputMessageRef.current.focus();
      },
      () => {
        setSubmitting(false);
        setErrors({ network: 'errors.network' });
        inputMessageRef.current.focus();
      },
    );
  };

  useEffect(() => {
    inputMessageRef.current.focus();
  }, [currentChannelId]);

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={handleFormSubmit}
    >
      {({
        handleSubmit, handleChange, values, errors, isSubmitting,
      }) => {
        const isSubmitDisabled = isSubmitting || values.message === '';

        // Back door for rollbar ErrorBoundary
        if (inputMessageRef?.current?.value === 'error') {
          throw new Error('Danger error');
        }

        return (
          <Form noValidate onSubmit={handleSubmit} autoComplete="off">
            <Form.Group controlId="formGroupNewMessage" className="d-flex position-relative">
              <Form.Label className="visually-hidden">{t('forms.message.label')}</Form.Label>
              <Form.Control
                className="rounded-pill"
                type="text"
                name="message"
                onChange={handleChange}
                value={values.message}
                placeholder={t('forms.message.placeholder')}
                ref={inputMessageRef}
                data-testid="new-message"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="rounded-pill ms-2"
                disabled={isSubmitDisabled}
              >
                {t('common.send')}
              </Button>
            </Form.Group>
            <Form.Control.Feedback type="invalid" className="ps-3" style={errors.network && { display: 'block' }}>
              {errors.network && t(errors.network)}
            </Form.Control.Feedback>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddMessageForm;
