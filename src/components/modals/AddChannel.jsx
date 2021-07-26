import React from 'react';
import { Modal } from 'react-bootstrap';

import cn from 'classnames';

import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';

import { blacklistSchemaBuilder } from '../../validationSchems.js';
import { useSocket } from '../../hooks/index.js';

const AddChannel = ({ onHide }) => {
  const addChannelRef = React.useRef();
  const { socket, acknowledgeWithTimeout } = useSocket();

  const allChannels = useSelector((state) => state.channelsInfo.channels);

  React.useEffect(() => {
    addChannelRef.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
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

  const buildInputClassName = (error) => cn('form-control rounded-pill', {
    'is-invalid': error,
  });

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ 'add-channel': '' }}
          validationSchema={blacklistSchemaBuilder('add-channel', allChannels.map((channel) => channel.name))}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {(props) => {
            if (!props.isValid) {
              addChannelRef.current.focus();
            }

            return (
              <Form>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="visually-hidden" htmlFor="add-channel">
                      Channel name
                    </label>
                    <Field
                      className={buildInputClassName(props.errors['add-channel'])}
                      id="add-channel"
                      name="add-channel"
                      type="text"
                      innerRef={addChannelRef}
                    />
                    {
                      (props.errors['add-channel'])
                        ? <div className="invalid-feedback small">{props.errors['add-channel']}</div>
                        : null
                    }
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
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
