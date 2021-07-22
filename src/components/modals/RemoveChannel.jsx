import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Formik, Form } from 'formik';
import { SocketContext } from '../../contexts/index.js';

const RemoveChannel = ({ onHide }) => {
  const { socket, acknowledgeWithTimeout } = React.useContext(SocketContext);
  const channelId = useSelector((state) => state.modal.extra.channelId);

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
        <Modal.Title>Remove channel</Modal.Title>
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
                  Are you absolutely sure?
                </div>
                <div className="col-12 text-end">
                  <button
                    className="btn btn-secondary rounded-pill"
                    type="button"
                    onClick={onHide}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger rounded-pill ms-2"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    Remove
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
