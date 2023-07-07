import { Navbar, Container, Breadcrumb, Row, Col, Card, Tab, ListGroup, Figure } from "react-bootstrap";


const Badge = ({ name }) => (
  <Figure className="p-4">
    <Figure.Image
      width={171}
      height={180}
      alt={name}
      src={`https://source.boringavatars.com/beam/${name}?colors=6D9E37,F9C80E,B3C100,E55934,56CCF2`}
    />
    <Figure.Caption className="text-center">
      {name}
    </Figure.Caption>
  </Figure>
)

const Badges = ({}) => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>📝 Stats</Card.Title>
      <Card.Text>
        Youve been with us since [USER.creationDate]!
      </Card.Text>
      <Card.Title>🏆 Badges</Card.Title>

      <Row>
        <Col xs={4}>
          <Badge name="Habitus" />
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
