import { Navbar, Container, Breadcrumb, Row, Col, Card, Tab, ListGroup, Figure } from "react-bootstrap";


const Badge = ({ name, label }) => (
  <Figure className="p-4">
    <Figure.Image
      width={171}
      height={180}
      alt={name}
      src={`/badges/${name}.png`}
    />
    <Figure.Caption className="text-center">
      {label}
    </Figure.Caption>
  </Figure>
)

const Badges = ({}) => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>🏆 Badges</Card.Title>

      <Row>
        <Col xs={4}>
          <Badge name="habitus" label="Béta Habitus🌿"/>
        </Col>
{/*

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
*/}
      </Row>
    </Card.Body>
  </Card>
);

export default Badges;
