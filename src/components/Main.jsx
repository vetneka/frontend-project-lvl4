import React from 'react';

const Main = ({ children }) => {
  return (
    <main className="flex-grow-1">
      {children}
    </main>
  );
};

export default Main;
