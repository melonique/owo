import React from 'react';
import { Button } from 'react-bootstrap';
import useAuthentication from '@/authentication/useAuthentication';
import { Checkbox, Form, Input } from '@/components';


const Login = ({ }) => {
  const { login } = useAuthentication();

  const onSubmit = async ({ email, password, remember }) => {
    await login({ email, password });
  }

  return (
    <Form onSubmit={onSubmit} >
      {/* import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
      <div className="text-center mb-1">
        <p>Sign in with:</p>

        <div className='d-flex justify-content-around mb-1'>
          <Button variant='link'><FaFacebookF /></Button>
          <Button variant='link'><FaTwitter /></Button>
          <Button variant='link'><FaGoogle /></Button>
          <Button variant='link'><FaGithub /></Button>
        </div>

        <p>or:</p>
      </div>
      */}

      <Input
        name="email"
        type="email"
        label="Courriel"
        placeholder="Entrez votre courriel"
        rules={{
          required: "Entrez votre courriel",
          pattern: { value: /\S+@\S+\.\S+/, message: "Entered value does not match email format" }
        }}
      />

      <Input
        name="password"
        type="password"
        label="Password"
        rules={{
          required: "Entrez votre mot de passe"
        }}
      />

      <Checkbox
        name="remember"
        label="Remember me"
      />

      <Button variant="primary" type="submit" className="mb-2 w-100">
        Sign In
      </Button>
    </Form>
  )
}
Login.propTypes = {};

export default Login;
