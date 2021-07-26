import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Nav, Navbar, Dropdown, ButtonGroup, NavItem, NavLink, Badge,
} from 'react-bootstrap';

import axios from 'axios';
import routes from '../routes.js';

import getModal from '../components/modals/index.js';
import { Message, AddMessageForm } from '../components/index.js';
import { setInitialState, selectChannelById, setCurrentChannel } from '../slices/channelsInfoSlice';
import { openModal, closeModal } from '../slices/modalSlice';

import { useAuth } from '../hooks/index.js';

import getAuthHeader from '../getAuthHeader.js';

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

const Home = () => {
  const modalType = useSelector((state) => state.modal.type);

  const { authedUser } = useAuth();

  const [pageState, setPageState] = React.useState('pending');

  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const activeChannel = useSelector((state) => selectChannelById(state, currentChannelId));
  const messages = useSelector((state) => {
    const allMessages = state.messagesInfo.messages;
    return allMessages.filter((message) => message.channelId === activeChannel.id);
  });
  const dispatch = useDispatch();
  const messagesContainerRef = React.useRef();
  const channelsContainerRef = React.useRef();

  const onHideModal = () => {
    dispatch(closeModal());
  };

  const onSelectChannel = (eventKey, event) => {
    event.preventDefault();
    dispatch(setCurrentChannel(Number(eventKey)));
  };

  const onShowModal = (type, item = null) => () => {
    dispatch(openModal({ type, item }));
  };

  const onRemoveChannel = (id) => (event) => {
    event.preventDefault();
    dispatch(openModal({ type: 'removing', extra: { channelId: id } }));
  };

  const onRenameChannel = (id) => (event) => {
    event.preventDefault();
    dispatch(openModal({ type: 'renaming', extra: { channelId: id } }));
  };

  const renderModal = (type) => {
    const Modal = getModal(type);
    return <Modal onHide={onHideModal} />;
  };

  React.useEffect(() => {
    if (pageState === 'pending') {
      axios.get(routes.dataPath(), { headers: getAuthHeader() })
        .then((response) => {
          dispatch(setInitialState(response.data));
          setPageState('fulfilled');
        })
        .catch((error) => {
          setPageState('rejected');
          console.error(error);
        });
    }

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  });

  if (pageState === 'pending') {
    return <div>Channels is loading...</div>;
  }

  if (pageState === 'rejected') {
    return <div>Something went wrong :(</div>;
  }

  return (
    <div className="row gx-4 gy-3 h-100">
      <h1 className="visually-hidden">Chats page</h1>

      <div className="channels-col shadow">
        <Navbar className="h-100 flex-md-column" expand="md">
          <Button variant="outline-primary" className="rounded-pill mb-md-3 d-flex align-items-center" onClick={onShowModal('adding')}>
            <span className="me-2 d-none d-sm-inline  ">Add channel</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z" />
              <path d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z" />
            </svg>
          </Button>

          <h2 className="h5 mb-0 mb-md-2 ms-auto ms-md-0">Channels</h2>

          <Navbar.Toggle aria-controls="navbarScroll" className="ms-3" />

          <Navbar.Collapse id="navbarScroll" className="w-100 overflow-auto" ref={channelsContainerRef}>
            <Nav className="h-100 mr-auto my-2 my-lg-0 flex-md-column w-100" activeKey={currentChannelId} onSelect={onSelectChannel}>
              {channels.map((channel, index) => {
                if (!channel.removable) {
                  return (
                    <Nav.Item key={channel.id}>
                      <Nav.Link eventKey={channel.id} className="d-flex align-items-center text-truncate">
                        <Avatar colorIndex={index} name={channel.name} className="me-2" />
                        <span className="text-truncate">{channel.name}</span>
                      </Nav.Link>
                    </Nav.Item>
                  );
                }

                return (
                  <Dropdown as={NavItem} key={channel.id}>
                    <ButtonGroup className="w-100">
                      <Nav.Link eventKey={channel.id} className="w-100 d-flex align-items-center text-truncate">
                        <Avatar colorIndex={index} name={channel.name} className="me-2" />
                        <span className="text-truncate">{channel.name}</span>
                      </Nav.Link>
                      <Dropdown.Toggle as={NavLink} className="p-2 ms-2" id={`channel-dropdown-${index}`} />
                    </ButtonGroup>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={onRenameChannel(channel.id)}>Rename</Dropdown.Item>
                      <Dropdown.Item className="text-danger" onClick={onRemoveChannel(channel.id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div className="col h-100">
        <div className="chat h-100 d-flex flex-column">
          <div className="chat__header p-2 mb-2">
            <div className="shadow mb-3 px-3 py-1 rounded-pill d-flex flex-wrap align-items-center">
              <span className="fs-6 me-2 text-truncate">
                #
                {activeChannel.name}
              </span>
              <span className="small text-muted me-2">
                (
                {messages.length}
                {' '}
                messages)
              </span>
            </div>
          </div>

          <div className="chat__body p-2 flex-grow-1 mb-2 overflow-auto" ref={messagesContainerRef}>
            <ul className="list-unstyled">
              {messages.map((message) => (
                <li className="text-break mb-4" key={message.id}>
                  <Message
                    currentUsername={authedUser.username}
                    username={message.username}
                    body={message.body}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="chat__footer mt-auto pt-2">
            <AddMessageForm
              currentUsername={authedUser.username}
              currentChannelId={currentChannelId}
            />
          </div>
        </div>
      </div>

      {modalType && renderModal(modalType)}
    </div>
  );
};

export default Home;
