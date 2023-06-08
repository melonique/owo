import { Navbar, Container, Breadcrumb, Row, Col, Card, Tab, ListGroup, Figure } from "react-bootstrap";


const Badge = ({ name }) => (
  <Figure className="p-4">
    <Figure.Image
      width={171}
      height={180}
      alt={name}
      src={`https://source.boringavatars.com/bauhaus/h jok ow${name}`}
    />
    <Figure.Caption className="text-center">
      {name}
    </Figure.Caption>
  </Figure>
)

const Badges = ({}) => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>📝 Stats & Badges</Card.Title>
      <Card.Text>
        Youve  been with us since 2021-01-01, have partcipated in 451 giveway, 52 loans, 32 services, and have 56 reviews.
      </Card.Text>

      <Row>
        <Col xs={4}>
          <Badge name="Backer" />
        </Col>

        <Col xs={4}>
          <Badge name="Verified" />
        </Col>

        <Col xs={4}>
          <Badge name="Secured" />
        </Col>

        <Col xs={4}>
          <Badge name="Sharer" />
        </Col>

        <Col xs={4}>
          <Badge name="Giver" />
        </Col>

        <Col xs={4}>
          <Badge name="Entrepreneur" />
        </Col>

        <Col xs={4}>
          <Badge name="Artisant" />
        </Col>

        <Col xs={4}>
          <Badge name="Service" />
        </Col>

      </Row>
    </Card.Body>
  </Card>
);

export default Badges;
