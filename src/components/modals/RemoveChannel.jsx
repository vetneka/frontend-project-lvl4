import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button, Modal } from 'react-bootstrap';

import { Formik } from 'formik';

import { useSocket } from '../../hooks';

import { selectModalExtraChannel } from '../../slices/modalSlice';

const RemoveChannel = ({ onHide }) => {
  const { removeChannel } = useSocket();
  const channel = useSelector(selectModalExtraChannel);
  const { t } = useTranslation();

  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    removeChannel(
      { id: values.channelId },
      () => {
        setSubmitting(false);
        onHide();
      },
      () => {
        setSubmitting(false);
        setErrors({ network: 'errors.network' });
      },
    );
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelId: channel.id }}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, errors, isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <p>{t('modals.remove.confirm')}</p>

                <Form.Control.Feedback type="invalid" style={errors.network && { display: 'block' }}>
                  {errors.network && t(errors.network)}
                </Form.Control.Feedback>
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
                  disabled={isSubmitting}
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
