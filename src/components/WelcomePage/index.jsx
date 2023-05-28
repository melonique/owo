import useAuthentication from '@/authentication/useAuthentication';
import React, { useState } from 'react';
import { Container, Form, Button, Nav, Card, Tab, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const WelcomePage = () => {
  const [activeKey, setActiveKey] = useState('login');
  const { login } = useAuthentication();


  const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm();
  const { register: registerRegister, handleSubmit: handleSubmitRegister } = useForm();

  const onSubmitLogin = async ({ email, passowrd, remember }) => {
    await login({email, passowrd});
  };

  const onSubmitRegister = data => {
    console.log(data);
  };



  return (
    <Container className="d-flex justify-content-center align-items-center">
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
                    <Form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                      <div className="text-center mb-3">
                        <p>Sign in with:</p>

                        <div className='d-flex justify-content-around mb-3'>
                          <Button variant='link'><FaFacebookF /></Button>
                          <Button variant='link'><FaTwitter /></Button>
                          <Button variant='link'><FaGoogle /></Button>
                          <Button variant='link'><FaGithub /></Button>
                        </div>

                        <p>or:</p>
                      </div>

                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...registerLogin('email')}/>
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...registerLogin('password')} />
                      </Form.Group>

                      <Form.Group className="d-flex justify-content-between mb-4">
                        <Form.Check type="checkbox" label="Remember me" {...registerLogin('remember')}/>
                        <Card.Link href="#">Forgot password?</Card.Link>
                      </Form.Group>

                      <Button variant="primary" type="submit" className="mb-4 w-100">
                        Sign In
                      </Button>

                      <Card.Text className="text-center">Not a member? <Card.Link href="#">Register</Card.Link></Card.Text>
                    </Form>
                  </Tab.Pane>

                  <Tab.Pane eventKey="register">
                    <Form onSubmit={handleSubmitRegister(onSubmitRegister)}>
                      <div className="text-center mb-3">
                        <p>Sign up with:</p>

                        <div className='d-flex justify-content-around mb-3'>
                          <Button variant='link'><FaFacebookF /></Button>
                          <Button variant='link'><FaTwitter /></Button>
                          <Button variant='link'><FaGoogle /></Button>
                          <Button variant='link'><FaGithub /></Button>
                        </div>

                        <p>or:</p>
                      </div>

                      <Form.Group className="mb-4" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" {...registerRegister('name')} />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" {...registerRegister('username')} />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formBasicEmailReg">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...registerRegister('email')} />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formBasicPasswordReg">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...registerRegister('password')} />
                      </Form.Group>
                      <Form.Group className="mb-4" controlId="formBasicPasswordReg">
                        <Form.Label>Password repeat</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...registerRegister('password2')} />
                      </Form.Group>

                      <Form.Group className='d-flex justify-content-center mb-4'>
                        <Form.Check type='checkbox' label='I have read and agree to the terms' {...registerRegister('tos')}/>
                      </Form.Group>

                      <Button variant="primary" type="submit" className="mb-4 w-100">
                        Sign Up
                      </Button>
                    </Form>
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
