import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="flex-shrink-0">
      <hr className="w-100" />

      <ListGroup horizontal>
        <ListGroup.Item className="border-0 p-0 pe-3 bg-transparent">
          <a href="https://github.com/vetneka/frontend-project-lvl4" className="d-flex align-items-center text-reset text-decoration-none opacity-70 opacity-fade-in" target="_blank">
            <span className="icon icon--github me-2"></span>
            <div className="d-flex flex-column">
              <span className="fs-dwarf text-muted">implemented by</span>
              <span className="fs-6 lh-1">vetneka</span>
            </div>
          </a>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 p-0 pe-3 bg-transparent">
          <a href="https://ru.hexlet.io/programs/frontend/projects/12" className="d-flex align-items-center text-reset text-decoration-none opacity-70 opacity-fade-in" target="_blank">
            <span className="icon icon--hexlet me-2"></span>
            <div className="d-flex flex-column">
              <span className="fs-dwarf text-muted">developed by</span>
              <span className="fs-6 lh-1">hexlet</span>
            </div>
          </a>
        </ListGroup.Item>
      </ListGroup>
    </footer>
  );
};

export default Footer;
