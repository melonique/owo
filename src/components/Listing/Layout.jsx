import { Row, Col, Card } from 'react-bootstrap';

const ListingLayout = ({ title, image, description, footer }) => (
  <Card className="mb-3">
    <Card.Header>
      <Card.Title>
        {title}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Row>
        {!!image &&
          <Col sm={4} xs={12}>
            <Card.Img
              src={image}
            />
          </Col>
        }
        <Col>
          <Card.Text>
            {description}
          </Card.Text>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      {footer}
    </Card.Footer>
  </Card>
);

export default ListingLayout;
