import React from 'react';

const Main = ({ children }) => (
  <main className="flex-grow-1 overflow-auto mb-3 mb-md-0">
    <div className="container h-100 overflow-auto">
      {children}
    </div>
  </main>
);

export default Main;
