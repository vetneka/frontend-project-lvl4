import React from 'react';

import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="pb-2">
    <Navbar variant="light" bg="transparent">
      <Container className="border-bottom pb-2">
        <Navbar.Brand as={Link} to="/">Hexlet chat</Navbar.Brand>
        <Button as={Link} to="/login" className="rounded-pill" variant="primary">Sign out</Button>
      </Container>
    </Navbar>
  </header>
);

export default Header;
