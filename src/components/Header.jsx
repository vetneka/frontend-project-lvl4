import React from 'react';

import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const Header = () => {
  const { loggedIn, logOut } = useAuth();

  const handleSignOut = (event) => {
    event.preventDefault();
    logOut();
  };

  return (
    <header className="pb-2">
      <Navbar variant="light" bg="transparent">
        <Container className="border-bottom pb-2">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          {loggedIn && <Button onClick={handleSignOut} className="rounded-pill" variant="primary">Sign out</Button>}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
