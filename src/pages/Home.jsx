import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialState, selectChannelById } from '../slices/channelsInfoSlice';

import axios from 'axios';
import routes from '../routes.js';

import { Channel, Message, AddMessageForm } from '../components/index.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return {
    Authorization: `Bearer ${userId.token}`,
  };
};

const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [pageState, setPageState] = React.useState('pending');

  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);
  const activeChannel = useSelector((state) => selectChannelById(state, currentChannelId));
  const dispatch = useDispatch();

  const messagesContainerRef = React.useRef();
  
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
    return <div>Channels is loading...</div>
  }
  
  if (pageState === 'rejected') {
    return <div>Something went wrong :(</div>
  }

  return (
    <>
      <h1 className="visually-hidden">Chats page</h1>
      <div className="row h-100">
        <div className="col-12 col-sm-3 mb-4 mb-sm-0 shadow">
          <button className="btn btn-outline-primary mb-3 rounded-pill d-flex align-items-center">
            <span className="me-2">Add channel</span>
            <svg xmlns="http://www.w3.org/2000/svg"  width="18" height="18" viewBox="0 0 512 512" fill="currentColor"><path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z"/><path d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z"/></svg>
            </button>
          <h2 className="h5 mb-3">Channels</h2>

          <ul className="list-unstyled row g-2">{channels.map((channel) => {
            return (
              <li key={channel.id}>
                <Channel id={channel.id} currentChannelId={currentChannelId} name={channel.name} />
              </li>
            );
          })}</ul>
        </div>

        <div className="h-100 col-12 col-sm-9">
          <div className="h-100 d-flex flex-column">
            <div className="shadow mb-3 px-3 py-1 rounded-pill">
              <span className="fs-6 me-2">#{activeChannel.name}</span>
              <span className="small text-muted me-2">({messages.length} messages)</span>
            </div>

            <div className="overflow-auto" ref={messagesContainerRef}>
              <ul className="list-unstyled">{messages.map((message) => {
                return (
                  <li className="text-break mb-4" key={message.id}>
                    <Message currentUsername={currentUser.username} username={message.username} body={message.body} />
                  </li>
                );
              })}</ul>
            </div>

            <div className="mt-auto pt-2">
              <AddMessageForm currentUser={currentUser} currentChannelId={currentChannelId}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
