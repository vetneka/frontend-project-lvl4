import React from 'react';
import cn from 'classnames';
import Avatar from './Avatar.jsx';

const Message = (props) => {
  const { username, body, currentUsername } = props;

  const messageClasses = cn('message', {
    'message--mirror': currentUsername === username,
  });

  return (
    <div className={messageClasses}>
      <Avatar name={username} className="message__avatar" />
      <div className="message__body">
        <div className="message__text">{body}</div>
        <div className="message__username">{username}</div>
      </div>
    </div>
  );
};

export default Message;
