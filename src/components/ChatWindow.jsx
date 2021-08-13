import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Message from './Message.jsx';
import AddMessageForm from './AddMessageForm.jsx';

import { useAuth } from '../hooks';

import { selectActiveChannel } from '../slices/channelsInfoSlice';
import { selectActiveChannelMessages } from '../slices/messagesInfoSlice';

const ChatWindow = () => {
  const { authInfo } = useAuth();
  const { t } = useTranslation();
  const messagesContainerRef = useRef();

  const activeChannel = useSelector(selectActiveChannel);
  const messages = useSelector(selectActiveChannelMessages);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  });

  return (
    <div className="chat h-100 d-flex flex-column">
      <div className="chat__header mb-3">
        <div className="shadow px-3 py-1 rounded-pill d-flex flex-wrap align-items-center">
          <span className="fs-6 me-2 text-truncate">
            #
            {activeChannel.name}
          </span>
          <span className="small text-muted me-2">
            (
            {t('chat.messages', { count: messages.length })}
            )
          </span>
        </div>
      </div>

      <div className="chat__body p-2 flex-grow-1 mb-2 overflow-auto" ref={messagesContainerRef}>
        <ul className="list-unstyled">
          {messages.map((message) => (
            <li className="text-break mb-4" key={message.id}>
              <Message
                currentUsername={authInfo.username}
                username={message.username}
                body={message.body}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="chat__footer mt-auto pt-2">
        <AddMessageForm
          currentUsername={authInfo.username}
          currentChannelId={activeChannel.id}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
