import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';

const HeaderBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Nav className="mr-auto">
        <Button variant="light" size="sm" onClick={() => {}}>
          <IoIosArrowBack />
        </Button>
        <Navbar.Brand>PAGE TITLE</Navbar.Brand>
      </Nav>
      <Navbar.Brand className="ml-auto">owo</Navbar.Brand>
    </Navbar>
  );
};

export default HeaderBar;
