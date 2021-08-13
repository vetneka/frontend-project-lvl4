import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Modal from '../components/modals/index.jsx';
import ChannelsNav from '../components/ChannelsNav.jsx';
import ChatWindow from '../components/ChatWindow.jsx';

import { fetchChannels } from '../slices/channelsInfoSlice';

const Chat = () => {
  const processState = useSelector((state) => state.channelsInfo.processState);

  const modalType = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (processState.status === 'loading') {
      dispatch(fetchChannels());
    }
  }, [processState.status]);

  if (processState.status === 'loading') {
    return <div>{t('common.loading')}</div>;
  }

  if (processState.status === 'error') {
    return <div>{t('common.error')}</div>;
  }

  return (
    <div className="row pt-2 pb-4 px-3 pe-md-0 gy-3 h-100">
      <div className="col-channels shadow">
        <ChannelsNav />
      </div>

      <div className="col col-chat">
        <ChatWindow />
      </div>

      {modalType && <Modal type={modalType} />}
    </div>
  );
};

export default Chat;
