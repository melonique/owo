import { Navbar, Container, Breadcrumb, Row, Col, Card, Tab, ListGroup, Figure } from "react-bootstrap";
import { Link } from "next/link"
import Badges from './Badges'
import UpdatePasswordForm from './UpdatePasswordForm'


const Profile = ({}) => (
  <>

    <Tab.Container id="profile-tabs" defaultActiveKey="#badges">
    <Container>
    <Row>
      <Col md={4}>
        <Card className="mb-4">
          <Card.Body className="text-center">
            <Card.Img
              src="https://api.multiavatar.com/aabgsf%20dffsa.png"
              alt="avatar"
              className="rounded-circle"
              style={{ width: '150px' }}
              fluid
            />
            <Card.Title className="mt-3 mb-0">User Name</Card.Title>
              <p className="text-muted mb-1">👁️‍🗨️ Complete Lgal name</p>
              <p className="text-muted mb-1">👑 Gamified Unlocked Title chosen</p>
              <p className="text-muted">📍 G1K 0H1</p>
              <p className="text-muted"> Rating: <br />⭐️⭐️⭐️⭐️⭐️</p>
          </Card.Body>
        </Card>

          <ListGroup className="mb-4">
            <ListGroup.Item action href="#badges">
              Stats & Badges
            </ListGroup.Item>
            <ListGroup.Item action href="#perso">
              Change Personal informations
            </ListGroup.Item>
            <ListGroup.Item action href="#life">
              Update Life context
            </ListGroup.Item>
            <ListGroup.Item action href="#privacy">
              Review Privacy settings
            </ListGroup.Item>
            <ListGroup.Item action href="#reviews">
              See my reviews
            </ListGroup.Item>
            <ListGroup.Item action href="#history">
              Transaction history
            </ListGroup.Item>
            <ListGroup.Item action href="#backer">
              Become a backer 🎉
            </ListGroup.Item>
            <ListGroup.Item action href="#logout">
              Logout
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#badges">
              <Badges />
            </Tab.Pane>
            <Tab.Pane eventKey="#perso">
              <UpdatePasswordForm />
              </Tab.Pane>
              <Tab.Pane eventKey="#life">
                Update Life context
              </Tab.Pane>
              <Tab.Pane eventKey="#privacy">
                Review Privacy settings
              </Tab.Pane>
              <Tab.Pane eventKey="#reviews">
                See my reviews
              </Tab.Pane>
              <Tab.Pane eventKey="#history">
                Transaction history
              </Tab.Pane>
              <Tab.Pane eventKey="#backer">
                Become a backer 🎉
              </Tab.Pane>
              <Tab.Pane eventKey="#logout">
                Logout
              </Tab.Pane>
          </Tab.Content>
      </Col>
    </Row>
    </Container>
    </Tab.Container>

  </>
);

export default Profile;
