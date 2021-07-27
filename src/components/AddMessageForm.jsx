import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';

import { Formik } from 'formik';

import { useSocket } from '../hooks/index.js';

const AddMessageForm = (props) => {
  const { currentChannelId, currentUsername } = props;
  const inputMessageRef = React.useRef();
  const { socket, acknowledgeWithTimeout } = useSocket();
  const { t } = useTranslation();

  const handleSubmitForm = (values, { setSubmitting, resetForm }) => {
    const message = {
      body: values.message,
      channelId: currentChannelId,
      username: currentUsername,
    };

    setSubmitting(true);
    socket.emit('newMessage', message, acknowledgeWithTimeout(
      () => {
        setSubmitting(false);
        resetForm();
        inputMessageRef.current.focus();
      },
      () => {
        setSubmitting(false);
        inputMessageRef.current.focus();
      },
      1000,
    ));
  };

  React.useEffect(() => {
    inputMessageRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={handleSubmitForm}
    >
      {({
        handleSubmit, handleChange, values, isSubmitting,
      }) => {
        const isSubmitDisabled = isSubmitting || values.message === '';

        // Back door for rollbar ErrorBoundary
        if (inputMessageRef?.current?.value === 'error') {
          throw new Error('Danger error');
        }

        return (
          <Form noValidate onSubmit={handleSubmit} autoComplete="off">
            <Form.Group controlId="formGroupNewMessage" className="d-flex">
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
              />
              <Button
                type="submit"
                className="rounded-pill ms-2"
                disabled={isSubmitDisabled}
              >
                {t('common.send')}
              </Button>
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddMessageForm;
