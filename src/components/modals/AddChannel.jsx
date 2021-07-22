import React from 'react';
import { Modal } from 'react-bootstrap';

import { Formik, Form, Field } from 'formik';
import { SocketContext } from '../../contexts/index.js';

const AddChannel = ({ onHide }) => {
  const addChannelRef = React.useRef();
  const { socket, acknowledgeWithTimeout } = React.useContext(SocketContext);

  React.useEffect(() => {
    addChannelRef.current.focus();
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    const channel = {
      name: values['add-channel'],
    };

    setSubmitting(true);
    socket.emit('newChannel', channel, acknowledgeWithTimeout(
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
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ 'add-channel': '' }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <div className="row g-3">
                <div className="col-12">
                  <label className="visually-hidden" htmlFor="add-channel">
                    Channel name
                  </label>
                  <Field
                    className="form-control rounded-pill"
                    id="add-channel"
                    name="add-channel"
                    type="text"
                    innerRef={addChannelRef}
                  />
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
                    className="btn btn-primary rounded-pill ms-2"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    Submit
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

export default AddChannel;
