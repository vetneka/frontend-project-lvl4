import React from 'react';
import { useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import cn from 'classnames';

import { useTranslation } from 'react-i18next';
import { selectChannelById } from '../../slices/channelsInfoSlice.js';

import { blacklistSchemaBuilder } from '../../validationSchems.js';
import { useSocket } from '../../hooks/index.js';

const RenameChannel = ({ onHide }) => {
  const renameChannelRef = React.useRef();
  const { socket, acknowledgeWithTimeout } = useSocket();
  const { t } = useTranslation();

  const currentChannelId = useSelector((state) => state.modal.extra.channelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChannelId));

  const allChannels = useSelector((state) => state.channelsInfo.channels);

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

  const buildInputClassName = (error) => cn('form-control rounded-pill', {
    'is-invalid': error,
  });

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ 'rename-channel': currentChannel.name }}
          validationSchema={blacklistSchemaBuilder('rename-channel', allChannels.map((channel) => channel.name))}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {(props) => {
            if (!props.isValid) {
              renameChannelRef.current.focus();
            }

            return (
              <Form>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="visually-hidden" htmlFor="rename-channel">
                      Channel name
                    </label>
                    <Field
                      className={buildInputClassName(props.errors['rename-channel'])}
                      id="rename-channel"
                      name="rename-channel"
                      type="text"
                      innerRef={renameChannelRef}
                    />
                    {
                      (props.errors['rename-channel'])
                        ? <div className="invalid-feedback small">{props.errors['rename-channel']}</div>
                        : null
                    }
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
                      className="btn btn-primary rounded-pill ms-2"
                      type="submit"
                      disabled={props.isSubmitting}
                    >
                      {t('common.send')}
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

export default RenameChannel;
