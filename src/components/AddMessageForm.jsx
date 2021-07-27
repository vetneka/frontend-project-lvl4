import React from 'react';

import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../hooks/index.js';

const AddMessageForm = (props) => {
  const { currentChannelId, currentUsername } = props;
  const { socket, acknowledgeWithTimeout } = useSocket();
  const messageInputRef = React.useRef();
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
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
        messageInputRef.current.focus();
      },
      () => {
        setSubmitting(false);
        messageInputRef.current.focus();
      },
      1000,
    ));
  };

  React.useEffect(() => {
    messageInputRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const isSubmitDisabled = formikProps.isSubmitting || formikProps.values.message === '';

        return (
          <Form className="row g-3">
            <div className="col-12 position-relative d-flex">
              <Field
                innerRef={messageInputRef}
                className="form-control rounded-pill me-2"
                id="new-message"
                name="message"
                type="text"
                disabled={formikProps.isSubmitting}
                placeholder={t('chat.placeholder')}
              />
              <button className="btn btn-primary rounded-pill" type="submit" disabled={isSubmitDisabled}>{t('common.send')}</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddMessageForm;
