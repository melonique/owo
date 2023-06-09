import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from "next/router"

const HeaderBar = () => {
  const router = useRouter();

  return (
    <Navbar bg="light" expand="lg">
      <Nav className="mr-auto">
        <Button variant="light" size="sm" onClick={() => {router.back()}}>
          <IoIosArrowBack />
        </Button>
        <Navbar.Brand>{router.pathname}</Navbar.Brand>
      </Nav>
      <Navbar.Brand className="ml-auto">owo</Navbar.Brand>
    </Navbar>
  );
};

export default HeaderBar;
