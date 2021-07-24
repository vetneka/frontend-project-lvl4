import React from 'react';

const Main = ({ children }) => (
  <main className="flex-grow-1 overflow-auto pt-2 pb-4">
    <div className="container h-100">
      {children}
    </div>
  </main>
);

export default Main;
