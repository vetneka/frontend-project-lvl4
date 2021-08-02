import { useContext } from 'react';

import { authContext, socketContext } from '../contexts/index.js';

export const useAuth = () => useContext(authContext);
export const useSocket = () => useContext(socketContext);
