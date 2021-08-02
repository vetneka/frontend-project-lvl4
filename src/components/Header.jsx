import React from 'react';

import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

const Header = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = (event) => {
    event.preventDefault();
    logOut();
  };

  return (
    <header>
      <Navbar variant="light" bg="transparent">
        <Container className="border-bottom pb-2">
          <Navbar.Brand as={Link} to="/">{t('header.logo')}</Navbar.Brand>
          {loggedIn && <Button onClick={handleSignOut} className="rounded-pill" variant="primary">{t('header.button')}</Button>}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
