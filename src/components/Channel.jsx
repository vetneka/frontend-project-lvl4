import React from 'react';
import { useDispatch } from 'react-redux';

import cn from 'classnames';

import { setCurrentChannel } from '../slices/channelsInfoSlice';

const availableColors = ['primary', 'secondary', 'success', 'danger', 'dark'];
const calculateColor = (id) => availableColors[id % availableColors.length];

const Channel = (props) => {
  const { id, name, currentChannelId } = props;
  const channelLabel = name[0].toUpperCase();
  const dispatch = useDispatch();

  const channelClasses = cn('w-100 btn border-top-0 border-end-0 border-bottom-0 border-2 rounded-0 d-flex align-items-center', {
    [`border-${calculateColor(id)}`]: id === currentChannelId,
  });

  const channelLabelClasses = cn('p-3 rounded-circle me-2 position-relative', {
    [`bg-${calculateColor(id)}`]: true,
  });

  const onSelectChannel = (event) => {
    event.preventDefault();
    dispatch(setCurrentChannel(id));
  };

  return (
    <button className={channelClasses} type="button" onClick={onSelectChannel}>
      <span className={channelLabelClasses}>
        <span className="position-absolute text-light fs-5 top-50 left-50 translate-middle">{channelLabel}</span>
      </span>
      <span className="d-none d-sm-inline">{name}</span>
    </button>
  );
};

export default Channel;
