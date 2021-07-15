import React from 'react';
import cn from 'classnames';

const availableColors = ['primary', 'secondary', 'success', 'danger', 'dark'];
const calculateColor = (id) => availableColors[id % availableColors.length];

const Channel = (props) => {
  const { id, name, currentChannelId } = props;
  const channelLabel = name[0].toUpperCase();
  
  const channelClasses = cn('w-100 btn btn-light border-0 rounded-0 d-flex align-items-center', {
    [`border-${calculateColor(id)} border-start border-2`]: id === currentChannelId,
  });

  const channelLabelClasses = cn('p-3 rounded-circle me-2 position-relative', {
    [`bg-${calculateColor(id)}`]: true,
  });

  return (
    <button className={channelClasses} type="button">
      <span className={channelLabelClasses}>
        <span className="position-absolute text-light fs-5 top-50 left-50 translate-middle">{channelLabel}</span>
      </span>
      <span>{name}</span>
    </button>
  );
};

export default Channel;