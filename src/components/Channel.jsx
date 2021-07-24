import React from 'react';
import { useDispatch } from 'react-redux';

import { ButtonGroup, NavDropdown } from 'react-bootstrap';
import cn from 'classnames';

import { setCurrentChannel } from '../slices/channelsInfoSlice';
import { openModal } from '../slices/modalSlice';

const ChannelButton = ({ channel, onSelectChannel }) => {
  const channelLabel = channel.name?.[0]?.toUpperCase();

  const channelClasses = cn(
    'nav-link w-100 btn border-top-0 border-end-0 border-bottom-0 border-2 rounded-0 d-flex align-items-center text-truncate',
  );

  const channelLabelClasses = cn('p-3 rounded-circle me-2 position-relative');

  return (
    <>
      <button className={channelClasses} type="button" onClick={onSelectChannel}>
        <span className={channelLabelClasses}>
          <span className="position-absolute text-light fs-5 top-50 left-50 translate-middle">
            {channelLabel}
          </span>
        </span>
        <span className="text-truncate">{channel.name}</span>
      </button>
    </>
  );
};

const Channel = (props) => {
  const { channel, currentChannelId } = props;
  const dispatch = useDispatch();

  const onSelectChannel = (event) => {
    event.preventDefault();
    dispatch(setCurrentChannel(channel.id));
  };

  const onRemoveChannel = (id) => (event) => {
    event.preventDefault();
    dispatch(openModal({ type: 'removing', extra: { channelId: id } }));
  };

  const onRenameChannel = (id) => (event) => {
    event.preventDefault();
    dispatch(openModal({ type: 'renaming', extra: { channelId: id } }));
  };

  if (!channel.removable) {
    return (
      <ChannelButton
        channel={channel}
        currentChannelId={currentChannelId}
        onSelectChannel={onSelectChannel}
      />
    );
  }

  return (
    <ButtonGroup className="align-items-start">
      <ChannelButton
        channel={channel}
        currentChannelId={currentChannelId}
        onSelectChannel={onSelectChannel}
      />
      <NavDropdown id="collasible-nav-dropdown">
        <NavDropdown.Item onClick={onRenameChannel(channel.id)}>Rename</NavDropdown.Item>
        <NavDropdown.Item className="bg-danger text-white" onClick={onRemoveChannel(channel.id)}>Delete</NavDropdown.Item>
      </NavDropdown>
    </ButtonGroup>
  );
};

export default Channel;
