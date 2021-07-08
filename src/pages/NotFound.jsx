import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column text-primary">
      <h1 className="fs-hero lh-1">404.</h1>
      <p className="fs-1 mb-4">Oooooooooops!</p>
      <Link to="/" className="btn btn-primary btn-lg rounded-pill">
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
