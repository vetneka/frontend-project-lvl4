import React from 'react';

import { authContext, socketContext } from '../contexts/index.js';

export const useAuth = () => React.useContext(authContext);
export const useSocket = () => React.useContext(socketContext);
