import useAuthentication from '@/authentication/useAuthentication';
import React, { useState } from 'react';
import { Container, Form, Button, Nav, Card, Tab, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const RegisterForm = ({}) => {
  const { register: registerUser } = useAuthentication();
  const { register, handleSubmit } = useForm();
  const [validated, setValidated] = useState(false);

  const onSubmit = async ({ email, password, username, name }) => {
    await registerUser({ email, password, username, name })
  }
  const onError = () => {
    setValidated(true);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} validated={validated}>
      <div className="text-center mb-1">
        <p>Sign up with:</p>

        <div className='d-flex justify-content-around mb-1'>
          <Button variant='link'><FaFacebookF /></Button>
          <Button variant='link'><FaTwitter /></Button>
          <Button variant='link'><FaGoogle /></Button>
          <Button variant='link'><FaGithub /></Button>
        </div>

        <p>or:</p>
      </div>

      <Form.Group className="mb-2" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" {...register('name')} />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" {...register('username')} />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmailReg">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register('email')} />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPasswordReg">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register('password')} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicPasswordReg">
        <Form.Label>Password repeat</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register('password2')} />
      </Form.Group>

      <Form.Group className='d-flex justify-content-center mb-2'>
        <Form.Check type='checkbox' label='I have read and agree to the terms' {...register('tos')}/>
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-2 w-100">
        Sign Up
      </Button>
    </Form>
  )
}
RegisterForm.propTypes = {};

export default RegisterForm;
