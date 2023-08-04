import useListing from '@/contexts/listing/useListing'
import { useEffect, useState } from 'react';
import Item from '@/components/Gallery/Item'
import { Container, Row, Col, Button, Navbar, Nav, ListGroup, Card, Form, FormControl, Dropdown } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"
import Link from 'next/link';
import useAuthentication from '@/contexts/authentication/useAuthentication';

const Listings = () => {
  const { user } = useAuthentication();
  const { listings, getPage } = useListing()
  const [page, setPage] = useState(1)

  const fetchPage = async () => {
    await getPage(page)
    setPage(page + 1)
  }

  useEffect(() => {
    fetchPage(0)
  }, [])

  return (
    <Container fluid>
      {/* Top bar with categories */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Research Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#category1">Category 1</Nav.Link>
            <Nav.Link href="#category2">Category 2</Nav.Link>
            <Nav.Link href="#category3">Category 3</Nav.Link>
            {/* Add more categories as needed */}
          </Nav>
          <Form className="form-inline">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Dropdown onSelect={() => {}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Order By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="relevance">Relevance</Dropdown.Item>
              <Dropdown.Item eventKey="date">Date</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        {/* Sidebar with categories and filters */}
        <Col md={3}>
          <h3>Categories</h3>
          <ListGroup className="mb-2">
            <ListGroup.Item>Service</ListGroup.Item>
            <ListGroup.Item>Don</ListGroup.Item>
            <ListGroup.Item>Vente</ListGroup.Item>
            <ListGroup.Item>Pret</ListGroup.Item>
            {/* Add more categories as needed */}
          </ListGroup>
          <h3>Tags</h3>

          {/* Add filter options here */}
        </Col>

        {/* Main area for listings */}
        <Col md={9}>
          <Row>

            {listings.filter(l => l.userProfile.id !== user.id).map((listing) => {
              return (
                <Col key={listing.id} xs={12} lg={6}>
                  <Item listing={listing}>
                    <Button as={Link} href={`/messages/${listing.userProfile.username.toLowerCase()}`}>Contacter</Button>
                  </Item>
                </Col>
              )
            })}

            <button onClick={fetchPage}>Next!</button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

Listings.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Listings
