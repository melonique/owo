import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { IoIosHome, IoMdSearch, IoIosChatbubbles, IoIosPerson, IoIosAddCircle } from 'react-icons/io';

const BottomNavbar = () => {
  return (
    <Navbar className="justify-content-around bottom-navbar" bg="primary" >
      <div className="nav-item text-center">
        <Nav.Link href="#home" >
          <IoIosHome className="icon" />
          <div className="nav-text">Home</div>
        </Nav.Link>
      </div>
      <div className="nav-item text-center">
        <Nav.Link href="#notifications">
          <IoIosChatbubbles className="icon" />
          <div className="nav-text">Message</div>
        </Nav.Link>
      </div>
      <div className="nav-item text-center">
        <Nav.Link href="#sell">
          <IoIosAddCircle className="icon" />
          <div className="nav-text">Sell</div>
        </Nav.Link>
      </div>
      <div className="nav-item text-center">
        <Nav.Link href="#search">
          <IoMdSearch className="icon" />
          <div className="nav-text">Search</div>
        </Nav.Link>
      </div>
      <div className="nav-item text-center">
        <Nav.Link href="#profile">
          <IoIosPerson className="icon" />
          <div className="nav-text">Profile</div>
        </Nav.Link>
      </div>
    </Navbar>
  );
};

export default BottomNavbar;
