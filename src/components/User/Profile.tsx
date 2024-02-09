import { Container, Row, Col, Card, Tab, ListGroup } from "react-bootstrap";
import Badges from './Badges'
import UpdatePasswordForm from './UpdatePasswordForm'
import useAuthentication from "@/contexts/authentication/useAuthentication"
import UserListings from './Listings'

const Profile = ({}) => {
  const { user, logout } = useAuthentication() || {};
  if (!user) { return (<span>LOADING PROFILE</span>) }

  return(
  <>
    <Tab.Container id="profile-tabs" defaultActiveKey="#badges">
    <Container>
    <Row>
      <Col md={4}>
        <Card className="mb-4">
          <Card.Body className="text-center">
            <Card.Img
              src={"https://api.multiavatar.com/" + user.id + '.png'}
              alt="avatar"
              className="rounded-circle"
              style={{ width: '100px' }}
            />
            <Card.Title className="mt-3 mb-0">{user.username}</Card.Title>
                  <p className="text-muted mb-1">👁️‍🗨️ {user.firstname} {user.name}</p>
              {/*
               <p className="text-muted mb-1">👑 Gamified Unlocked Title chosen</p>
                <p className="text-muted"> Rating: <br />⭐️⭐️⭐️⭐️⭐️</p>
               */}
                  <p className="text-muted">📍 Habitus🌿</p>
          </Card.Body>
        </Card>

          <ListGroup className="mb-4">
            <ListGroup.Item action href="#badges">
              🏆 Mes Badges
            </ListGroup.Item>
            <ListGroup.Item action href="#perso">
              🔐 Changer mon mot de passe
            </ListGroup.Item>
            {/*
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
            </ListGroup.Item> */}
            <ListGroup.Item action href="#my-listings">
              📋 Mes Annonces
            </ListGroup.Item>
            <ListGroup.Item action onClick={logout}>
              ⛔ Se déconnecter
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
                <Tab.Pane eventKey="#my-listings">
                  <UserListings />
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
)}

export default Profile;
