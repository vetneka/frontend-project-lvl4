import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button, Modal } from 'react-bootstrap';

import { Formik } from 'formik';

import { useSocket } from '../../hooks/index.js';

const RemoveChannel = ({ onHide }) => {
  const { socket, acknowledgeWithTimeout } = useSocket();
  const channelId = useSelector((state) => state.modal.extra.channelId);
  const { t } = useTranslation();

  const handleSubmitForm = (values, { setSubmitting }) => {
    setSubmitting(true);
    socket.emit('removeChannel', { id: values.channelId }, acknowledgeWithTimeout(
      () => {
        setSubmitting(false);
        onHide();
      },
      () => {
        setSubmitting(false);
        onHide();
      },
      1000,
    ));
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelId }}
          onSubmit={handleSubmitForm}
        >
          {(props) => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <Form.Group className="mb-3">
                <p>{t('modals.remove.confirm')}</p>
              </Form.Group>

              <Form.Group className="text-end">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={onHide}
                  className="rounded-pill"
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  className="rounded-pill ms-2"
                  disabled={props.isSubmitting}
                >
                  {t('common.delete')}
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
