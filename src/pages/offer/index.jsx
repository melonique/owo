import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Chat } from '@/components'

const Listings = () => {

  return (
    <Container fluid className="text-center">
      <Row className="d-flex justify-content-center">
        <Col md="10" lg="8" xl="6">
          <Chat />
        </Col>
      </Row>

    </Container>
  );
}

export default Listings
