import useAuthentication from '@/authentication/useAuthentication';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
    <Form onSubmit={handleSubmit(onSubmit, onError)} validated={validated}>
      <Form.Group className="mb-2" controlId="formBasicPasswordReg">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register('password')} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicPasswordReg">
        <Form.Label>Password repeat</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register('password2')} />
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-2 w-100">
        Change password
      </Button>
    </Form>
  )
}

export default UpdatePasswordForm;