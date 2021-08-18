import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button, Modal } from 'react-bootstrap';

import { has } from 'lodash';

import { Formik } from 'formik';

import { selectChannels } from '../../slices/channelsInfoSlice';
import { selectModalExtraChannel } from '../../slices/modalSlice';

import { blacklistSchemaBuilder } from '../../validationSchemas';
import { useSocket } from '../../hooks';

const RenameChannel = ({ onHide }) => {
  const inputChannelRef = useRef();
  const { renameChannel } = useSocket();
  const { t } = useTranslation();

  const extraChannel = useSelector(selectModalExtraChannel);

  const allChannels = useSelector(selectChannels);
  const channelsNames = allChannels.map((channel) => channel.name);

  useEffect(() => {
    inputChannelRef.current.select();
  }, []);

  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const renamedChannel = {
      id: extraChannel.id,
      name: values.name,
    };

    setSubmitting(true);
    renameChannel(
      renamedChannel,
      () => {
        setSubmitting(false);
        onHide();
      },
      () => {
        setSubmitting(false);
        inputChannelRef.current.focus();
        setErrors({ network: 'errors.network' });
      },
    );
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: extraChannel.name,
          }}
          validationSchema={blacklistSchemaBuilder('name', channelsNames)}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleFormSubmit}
        >
          {({
            handleSubmit, handleChange, values, errors, isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit} autoComplete="off">
              <Form.Group controlId="formGroupRenameChannel" className="mb-3">
                <Form.Label className="visually-hidden">{t('forms.channel.label')}</Form.Label>
                <Form.Control
                  className="rounded-pill"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  isInvalid={has(errors, 'name')}
                  placeholder={t('forms.channel.placeholder')}
                  ref={inputChannelRef}
                  data-testid="rename-channel"
                  disabled={isSubmitting}
                />
                <Form.Control.Feedback type="invalid" className="ps-3" style={errors.network && { display: 'block' }}>
                  {errors.network && t(errors.network)}
                  {t(errors.name)}
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
                  type="submit"
                  className="rounded-pill ms-2"
                  disabled={isSubmitting}
                >
                  {t('common.send')}
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
