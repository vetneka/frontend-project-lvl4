import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Modal from '../components/modals/index.jsx';
import { ChannelsNav, Chat } from '../components/index.js';

import { setInitialStateThunk } from '../slices/channelsInfoSlice';

const Home = () => {
  const [pageState, setPageState] = React.useState('pending');

  const modalType = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (pageState === 'pending') {
      dispatch(setInitialStateThunk())
        .then(() => {
          setPageState('fulfilled');
        })
        .catch((error) => {
          setPageState('rejected');
          console.error(error);
        });
    }
  }, [pageState, dispatch]);

  if (pageState === 'pending') {
    return <div>{t('common.loading')}</div>;
  }

  if (pageState === 'rejected') {
    return <div>{t('common.error')}</div>;
  }

  return (
    <div className="row gx-4 gy-3 h-100">
      <div className="channels-col shadow">
        <ChannelsNav />
      </div>

      <div className="col h-100">
        <Chat />
      </div>

      {modalType && <Modal type={modalType} />}
    </div>
  );
};

export default Home;
