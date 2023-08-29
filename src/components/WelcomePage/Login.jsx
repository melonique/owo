import React from 'react';
import { Button } from 'react-bootstrap';
import useAuthentication from '@/contexts/authentication/useAuthentication';
import { Checkbox, Form, Input } from '@/components';
import { useRouter } from 'next/router';

const Login = ({ }) => {
  const router = useRouter();
  const { error, login } = useAuthentication();

  const onSubmit = async ({ email, password }) => {
    await login({ email, password }, () => router.push('/listings'));
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
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
          label="Mot de passse"
          rules={{
            required: "Entrez votre mot de passe"
          }}
        />

        <Button variant="primary" type="submit" className="mb-2 w-100">
          Connexion
        </Button>
      </Form>

      {error && (
        <p className="text-danger">
          {error.message}
        </p>
      )}
    </>
  )
}
Login.propTypes = {};

export default Login;
