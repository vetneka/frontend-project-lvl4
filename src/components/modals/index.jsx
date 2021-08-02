import React from 'react';
import { useDispatch } from 'react-redux';

import { actions as modalActions } from '../../slices/modalSlice';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modalTypes = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const Modal = ({ type }) => {
  const dispatch = useDispatch();

  const onHideModal = () => {
    dispatch(modalActions.closeModal());
  };

  const SelectedModal = modalTypes[type];

  return <SelectedModal onHide={onHideModal} />;
};

export default Modal;
