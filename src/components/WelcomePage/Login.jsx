import useAuthentication from '@/authentication/useAuthentication';
import React, { useState } from 'react';
import { Container, Form, Button, Nav, Card, Tab, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Login = ({}) => {
  const { login } = useAuthentication();
  const { register, handleSubmit } = useForm();
  const [validated, setValidated] = useState(false);

  const onSubmit = async ({ email, passowrd, remember }) => {
    await login({email, passowrd});
  }
  const onError = () => {
    setValidated(true);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} validated={validated}>
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
        <Form.Control type="email" placeholder="Enter email" {...register('email', { required: true })}/>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register('password')} />
      </Form.Group>

      <Form.Group className="d-flex justify-content-between mb-4">
        <Form.Check type="checkbox" label="Remember me" {...register('remember')}/>
        <Card.Link href="#">Forgot password?</Card.Link>
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-4 w-100">
        Sign In
      </Button>

      <Card.Text className="text-center">Not a member? <Card.Link href="#">Register</Card.Link></Card.Text>
    </Form>
  )
}
Login.propTypes = {};

export default Login;
