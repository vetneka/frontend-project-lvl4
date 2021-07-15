import React from 'react';

const Main = ({ children }) => {
  return (
    <main className="flex-grow-1 overflow-hidden pt-2 pb-4">
      <div className="container">
        {children}
      </div>
    </main>
  );
};

export default Main;
