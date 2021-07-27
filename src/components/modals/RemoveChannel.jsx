import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.js';

const RemoveChannel = ({ onHide }) => {
  const { socket, acknowledgeWithTimeout } = useSocket();
  const channelId = useSelector((state) => state.modal.extra.channelId);
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting }) => {
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
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <div className="row g-3">
                <div className="col-12">
                  {t('modals.remove.confirm')}
                </div>
                <div className="col-12 text-end">
                  <button
                    className="btn btn-secondary rounded-pill"
                    type="button"
                    onClick={onHide}
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    className="btn btn-danger rounded-pill ms-2"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    {t('common.delete')}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
