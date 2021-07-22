import React from 'react';
import { useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import { SocketContext } from '../../contexts/index.js';

import { selectChannelById } from '../../slices/channelsInfoSlice.js';

const RenameChannel = ({ onHide }) => {
  const renameChannelRef = React.useRef();
  const { socket, acknowledgeWithTimeout } = React.useContext(SocketContext);

  const currentChannelId = useSelector((state) => state.modal.extra.channelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChannelId));

  React.useEffect(() => {
    renameChannelRef.current.select();
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    const renamedChannel = {
      id: currentChannelId,
      name: values['rename-channel'],
    };

    setSubmitting(true);
    socket.emit('renameChannel', renamedChannel, acknowledgeWithTimeout(
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
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ 'rename-channel': currentChannel.name }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <div className="row g-3">
                <div className="col-12">
                  <label className="visually-hidden" htmlFor="rename-channel">
                    Channel name
                  </label>
                  <Field
                    className="form-control rounded-pill"
                    id="rename-channel"
                    name="rename-channel"
                    type="text"
                    innerRef={renameChannelRef}
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

export default RenameChannel;