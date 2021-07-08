import React from 'react';
import { Button } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center flex-shrink-0">
      <h1 className="h3 m-0">Slack Chat</h1>
      <Button variant="primary rounded-pill">Sign out</Button>

      <hr className="w-100" />
    </header>
  );
};

export default Header;
