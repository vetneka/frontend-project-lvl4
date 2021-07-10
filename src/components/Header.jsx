import React from 'react';

import {
  Link,
} from "react-router-dom";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center flex-shrink-0">
      <Link to="/">
        <h1 className="h3 m-0">Slack Chat</h1>
      </Link>
      <Link to="/login" className="btn btn-primary rounded-pill">Sign out</Link>

      <hr className="w-100" />
    </header>
  );
};

export default Header;
