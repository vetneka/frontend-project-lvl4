import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, Nav, Navbar, Dropdown, ButtonGroup, NavItem, NavLink,
} from 'react-bootstrap';

import Avatar from './Avatar.jsx';

import {
  actions as channelsInfoActions,
  selectChannels,
  selectCurrentChannelId,
} from '../slices/channelsInfoSlice';
import { actions as modalActions } from '../slices/modalSlice';

const Channel = ({
  channel, index, onRenameChannel, onRemoveChannel,
}) => {
  const { t } = useTranslation();

  if (!channel.removable) {
    return (
      <Nav.Item>
        <Nav.Link eventKey={channel.id} className="d-flex align-items-center text-truncate">
          <Avatar colorIndex={index} name={channel.name} className="me-2" />
          <span className="text-truncate">{channel.name}</span>
        </Nav.Link>
      </Nav.Item>
    );
  }

  return (
    <Dropdown as={NavItem}>
      <ButtonGroup className="w-100">
        <Nav.Link eventKey={channel.id} className="w-100 d-flex align-items-center text-truncate">
          <Avatar colorIndex={index} name={channel.name} className="me-2" />
          <span className="text-truncate">{channel.name}</span>
        </Nav.Link>
        <Dropdown.Toggle as={NavLink} className="p-2 ms-2 align-self-center" id={`channel-dropdown-${index}`} />
      </ButtonGroup>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onRenameChannel(channel.id)}>{t('channels.buttons.rename')}</Dropdown.Item>
        <Dropdown.Item className="text-danger" onClick={onRemoveChannel(channel.id)}>{t('channels.buttons.delete')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChannelsNav = () => {
  const channelsContainerRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const channels = useSelector(selectChannels);

  const onSelectChannel = (eventKey, event) => {
    event.preventDefault();
    dispatch(channelsInfoActions.setCurrentChannel(Number(eventKey)));
  };

  const onShowModal = (type, item = null) => () => {
    dispatch(modalActions.openModal({ type, item }));
  };

  const onRemoveChannel = (id) => (event) => {
    event.preventDefault();
    dispatch(modalActions.openModal({ type: 'removing', extra: { channelId: id } }));
  };

  const onRenameChannel = (id) => (event) => {
    event.preventDefault();
    dispatch(modalActions.openModal({ type: 'renaming', extra: { channelId: id } }));
  };

  return (
    <Navbar className="h-100 flex-md-column" expand="md">
      <div className="d-flex justify-content-between align-items-center mb-md-3">
        <h2 className="h5 mb-0 me-2">{t('channels.title')}</h2>

        <Button size="sm" variant="outline-primary" className="border-0" onClick={onShowModal('adding')}>
          <span className="visually-hidden">+</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z" />
            <path d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z" />
          </svg>
        </Button>
      </div>

      <Navbar.Toggle aria-controls="navbarScroll" className="ms-3">
        <span className="navbar-toggler-icon" />
        <span className="btn-close" />
      </Navbar.Toggle>

      <Navbar.Collapse id="navbarScroll" className="w-100 overflow-auto" ref={channelsContainerRef}>
        <Nav className="h-100 mr-auto my-lg-0 flex-md-column w-100" activeKey={currentChannelId} onSelect={onSelectChannel}>
          {channels.map((channel, index) => (
            <Channel
              key={channel.id}
              channel={channel}
              index={index}
              onRemoveChannel={onRemoveChannel}
              onRenameChannel={onRenameChannel}
            />
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ChannelsNav;
