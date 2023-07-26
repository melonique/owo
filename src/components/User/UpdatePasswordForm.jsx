import useAuthentication from '@/contexts/authentication/useAuthentication';
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UpdatePasswordForm = () => {
  const { updatePassword } = useAuthentication()
  const { register, handleSubmit } = useForm()
  const [validated, setValidated] = useState(false)

  const onSubmit = async ({ password }) => {
    await updatePassword({ password })
  }
  const onError = () => {
    setValidated(true);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>🔐 Changer mon mot de passe</Card.Title>
        <Form onSubmit={handleSubmit(onSubmit, onError)} validated={validated}>
          <Form.Group className="mb-2" controlId="formBasicPasswordReg">
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Password" {...register('password')} />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPasswordReg">
            <Form.Label>Répéter le mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Password" {...register('password2')} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-2 w-100">
            Changer
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default UpdatePasswordForm;
