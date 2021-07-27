import React from 'react';
import { Badge } from 'react-bootstrap';

const Avatar = ({ colorIndex, name, className = '' }) => {
  const availableColors = ['primary', 'secondary', 'success', 'danger', 'dark'];
  const calculateColor = (id) => availableColors[id % availableColors.length];

  const avatarLabel = (name) ? name[0].toUpperCase() : '-';
  const avatarClassName = `avatar ${className}`;

  return (
    <Badge bg={calculateColor(colorIndex)} className={avatarClassName}>
      <span className="avatar__body">{avatarLabel}</span>
    </Badge>
  );
};

export default Avatar;
