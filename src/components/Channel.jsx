import React from 'react';
import { useDispatch } from 'react-redux';

import { Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';

import { setCurrentChannel } from '../slices/channelsInfoSlice';
import { openModal } from '../slices/modalSlice';

const availableColors = ['primary', 'secondary', 'success', 'danger', 'dark'];
const calculateColor = (id) => availableColors[id % availableColors.length];

const ChannelButton = ({ channel, currentChannelId, onSelectChannel }) => {
  const channelLabel = channel.name?.[0]?.toUpperCase();

  const channelClasses = cn(
    'w-100 btn border-top-0 border-end-0 border-bottom-0 border-2 rounded-0 d-flex align-items-center text-truncate',
    {
      [`border-${calculateColor(channel.id)}`]: channel.id === currentChannelId,
    },
  );

  const channelLabelClasses = cn('p-3 rounded-circle me-2 position-relative', {
    [`bg-${calculateColor(channel.id)}`]: true,
  });

  return (
    <button className={channelClasses} type="button" onClick={onSelectChannel}>
      <span className={channelLabelClasses}>
        <span className="position-absolute text-light fs-5 top-50 left-50 translate-middle">
          {channelLabel}
        </span>
      </span>
      <span className="d-none d-sm-inline">{channel.name}</span>
    </button>
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
    <Dropdown as={ButtonGroup} className="d-flex">
      <ChannelButton
        channel={channel}
        currentChannelId={currentChannelId}
        onSelectChannel={onSelectChannel}
      />

      <Dropdown.Toggle split variant="white" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={onRenameChannel(channel.id)}>Rename</Dropdown.Item>
        <Dropdown.Item className="bg-danger text-white" onClick={onRemoveChannel(channel.id)}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Channel;
