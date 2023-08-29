import useListing from '@/contexts/listing/useListing'
import { useEffect, useState } from 'react';
import Item from '@/components/Gallery/Item'
import { Container, Row, Col, Button, Navbar, ListGroup, Form, FormControl, Spinner } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"
import { useRouter } from 'next/router'
import useAuthentication from '@/contexts/authentication/useAuthentication';
import { initializeConversation } from "@/conversations/ConversationClient";
import { IoIosChatbubbles } from 'react-icons/io';

const Listings = () => {
  const { user } = useAuthentication();
  const { loading, listings, getAll, search } = useListing()
  const [currentSearch, setCurrentSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    getAll()
  }, [])

  const createConversation = async ({ title, user1, user2 }) => {
    const loaded = await initializeConversation({ title: title, users: [user1, user2] })
    router.push(`/messages/${loaded.id}`)
  }

  const searchAction = (event) => {
    search(currentSearch);
    event.preventDefault()
  }

  return (
    <Container fluid>
      {/* Top bar with categories */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Les annonces</Navbar.Brand>
        <Form className="form-inline" method="post" onSubmit={searchAction}>
          <FormControl type="text" placeholder="Recherche" onChange={(event) => setCurrentSearch(event.target.value)} value={currentSearch} />
          <Button variant="outline-success" onClick={searchAction}>{loading ? <Spinner as="span" size="sm" /> : 'Recherche'}</Button>
          <Button variant="outline-success" onClick={getAll}>Réinitialiser la recherche!</Button>
        </Form>
      </Navbar>

      <Row className="pt-3">
        {/* Sidebar with categories and filters */}
        <Col md={3}>
          {/* <Form>

            <Dropdown onSelect={() => { }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Order By
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="relevance">Relevance</Dropdown.Item>
                <Dropdown.Item eventKey="date">Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form> */}

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
            <h3>Vos offres</h3>
            {listings.map((listing) => {
              return (
                <Col key={listing.id} xs={12} lg={6}>
                  <Item listing={listing}>
                    <Button onClick={() => createConversation({ title: listing.title, user1: user.id, user2: listing.userProfile.id })}>
                      <IoIosChatbubbles className="icon" />
                    </Button>
                  </Item>
                </Col>
              )
            })}
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
