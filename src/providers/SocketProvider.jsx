import React from 'react';

import { socketContext } from '../contexts/index';

const SocketProvider = ({ api, children }) => (
  <socketContext.Provider value={api}>
    {children}
  </socketContext.Provider>
);

export default SocketProvider;
