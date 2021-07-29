import React from 'react';
import { Badge } from 'react-bootstrap';

const availableColors = ['primary', 'secondary', 'success', 'danger', 'dark'];
const calculateColor = (id) => availableColors[id % availableColors.length];

const Avatar = ({ colorIndex, name, className = '' }) => {
  const avatarLabel = (name) ? name[0].toUpperCase() : '-';
  const avatarClassName = `avatar ${className}`;

  const bgColor = (colorIndex !== undefined)
    ? calculateColor(colorIndex)
    : null;

  return (
    <Badge bg={bgColor} className={avatarClassName}>
      <span className="avatar__body">{avatarLabel}</span>
    </Badge>
  );
};

export default Avatar;
