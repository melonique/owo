import React from 'react';
import { Badge, Navbar, Nav } from 'react-bootstrap'
import { IoIosApps, IoMdSearch, IoIosChatbubbles, IoIosPerson, IoIosAddCircle } from 'react-icons/io';
import Link from 'next/link'

const BottomNavbar = () => {
  return (
    <Navbar className="justify-content-around bottom-navbar" bg="primary" >
      <div className="nav-item text-center">
        <Link href="/listings" >
          <IoIosApps className="icon" />
          <div className="nav-text">Listings</div>
        </Link>
      </div>
      <div className="nav-item text-center">
        <Nav.Link href="/messages/offer">
          <IoIosChatbubbles className="icon" />
          <Badge bg="danger">&nbsp;</Badge>
          <div className="nav-text">Messages</div>
        </Nav.Link>
      </div>
      <div className="nav-item text-center">
        <Link href="/offer">
          <IoIosAddCircle className="icon" />
          <div className="nav-text">Offer</div>
        </Link>
      </div>
      <div className="nav-item text-center">
        <Nav.Link href="#search">
          <IoMdSearch className="icon" />
          <div className="nav-text">Search</div>
        </Nav.Link>
      </div>
      <div className="nav-item text-center">
        <Link href="/profile">
          <IoIosPerson className="icon" />
          <div className="nav-text">Profile</div>
        </Link>
      </div>
    </Navbar>
  );
};

export default BottomNavbar;
