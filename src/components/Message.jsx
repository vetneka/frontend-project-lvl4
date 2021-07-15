import React from 'react';
import cn from 'classnames';

const Message = (props) => {
  const { username, body, currentUsername } = props;

  const messageLabel = username[0].toUpperCase();

  const messageClasses = cn('message', {
    'message--mirror': currentUsername === username,
  });

  return (
    <div className={messageClasses}>
      <div className="avatar message__avatar">
        <span className="avatar__body">{messageLabel}</span>
      </div>
      <div className="message__body">
        <div className="message__text">{body}</div>
        <div className="message__username">{username}</div>
      </div>
    </div>
  );
};

export default Message;
