import React from 'react';

import { Formik, Form, Field } from 'formik';

import { SocketContext } from '../contexts/index.js';

const AddMessageForm = (props) => {
  const { currentChannelId, currentUser } = props;
  const { socket, acknowledgeWithTimeout } = React.useContext(SocketContext);
  const messageInputRef = React.useRef();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const message = {
      body: values.message,
      channelId: currentChannelId,
      username: currentUser.username,
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
        'message': '',
      }}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isSubmitDisabled = props.isSubmitting || props.values.message === '';
        
        return (
          <Form className="row g-3" >
            <div className="col-12 position-relative d-flex">
              <Field innerRef={messageInputRef} className="form-control rounded-pill me-2" id="new-message" name="message" type="text" disabled={props.isSubmitting}/>
              <button className="btn btn-primary rounded-pill" type="submit" disabled={isSubmitDisabled}>Send</button>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};

export default AddMessageForm;
