import React, { useState } from 'react';
import { Container, Nav, Card, Tab, Row, Col } from 'react-bootstrap';

import Login from './Login';
import RegisterForm from './RegisterForm';

const WelcomePage = () => {
  const [activeKey, setActiveKey] = useState('login');

  return (
    <Container className="d-flex justify-content-center align-items-center" >
      <Card style={{ width: '30rem' }} className="border-primary">
        <Card.Body>
          <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
            <Row>
              <Col>
                <Nav variant="pills" className="justify-content-center mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Connexion</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="register">Inscription</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <Login />
                    <Card.Text className="text-center mt-2">Tu n'es pas membre? <Card.Link href="#" onClick={() => setActiveKey('register')}>Inscrit-toi!</Card.Link></Card.Text>
                  </Tab.Pane>
                  <Tab.Pane eventKey="register">
                    <RegisterForm />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default WelcomePage;
