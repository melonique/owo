import useAuthentication from '@/authentication/useAuthentication';
import React, { useState } from 'react';
import { Container, Form, Button, Nav, Card, Tab, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import Login from './Login';
import RegisterForm from './RegisterForm';

const WelcomePage = () => {
  const [activeKey, setActiveKey] = useState('login');

  return (
    <Container className="d-flex justify-content-center align-items-center mt-3 ">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
            <Row>
              <Col>
                <Nav variant="pills" className="justify-content-center mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="register">Register</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <Login />
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
