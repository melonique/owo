import useListing from '@/contexts/listing/useListing'
import { useEffect, useState } from 'react';
import Item from '@/components/Gallery/Item'
import { Container, Row, Col, Button, Navbar, ListGroup, Form, FormControl, Dropdown } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"
import { useRouter } from 'next/router'
import useAuthentication from '@/contexts/authentication/useAuthentication';
import { initializeConversation } from "@/conversations/ConversationClient";

const Listings = () => {
  const { user } = useAuthentication();
  const { listings, getPage } = useListing()
  const [page, setPage] = useState(1)
  const router = useRouter()

  const fetchPage = async () => {
    await getPage(page)
    setPage(page + 1)
  }

  useEffect(() => {
    fetchPage(0)
  }, [])

  const createConversation = async ({ title, user1, user2 }) => {
    const loaded = await initializeConversation({ title: title, users: [user1, user2] })
    router.push(`/messages/${loaded.id}`)
  }

  return (
    <Container fluid>
      {/* Top bar with categories */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Les annonces</Navbar.Brand>
        <Form className="form-inline">
          <FormControl type="text" placeholder="Search" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar>

      <Row className="pt-3">
        {/* Sidebar with categories and filters */}
        <Col md={3}>
          <Form>

            <Dropdown onSelect={() => { }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Order By
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="relevance">Relevance</Dropdown.Item>
                <Dropdown.Item eventKey="date">Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>

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
            <h3>314 offres</h3>
            {listings.filter(l => l.userProfile.id !== user.id).map((listing) => {
              return (
                <Col key={listing.id} xs={12} lg={6}>
                  <Item listing={listing}>
                    <Button onClick={() => createConversation({ title: listing.id, user1: user.id, user2: listing.userProfile.id })}>
                      Contacter
                    </Button>
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
