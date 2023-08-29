import React from 'react';
import { Button, Col } from 'react-bootstrap';
import useAuthentication from '@/contexts/authentication/useAuthentication';
import { Checkbox, Form, Input } from '@/components';
import { useRouter } from 'next/router';

const RegisterForm = ({ }) => {
  const router = useRouter();
  const { error, register: registerUser } = useAuthentication();

  const onSubmit = async ({ email, password, username, name, firstname, tos }) => {
    await registerUser({ email, password, username, name, firstname, tos }, () => router.push('/listings'));
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          name="firstname"
          label="Prénom"
          placeholder=""
          rules={{
            required: "Entrez votre prénom",
          }}
        />
        <Input
          name="name"
          label="Nom de famille"
          placeholder=""
          rules={{
            required: "Entrez votre nom de famille",
          }}
        />

        <Input
          name="username"
          label="Nom d'utilisateur"
          placeholder=""
          exemple="Nom sous lequel vous apparaissez publiquement"
          rules={{
            required: "Entrez un nom d'utilisateur",
          }}
        />
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
            required: "Entrez un mot de passe",
          }}
        />
        <Input
          name="password2"
          type="password"
          label="Password"
          rules={{
            required: "Entrez un mot de passe",
            validate: {
              validate: (val, values) => {
                if (values.password != val) {
                  return "Your passwords do no match";
                }
              },
            }
          }}
        />

        <Checkbox
          name="tos"
          label="J'ai lu, comprends et accepte les termes et conditions d'utilisations, ainsi que la politique de confidentialité et de données "
          rules={{
            required: "Acceptez les conditions d'utilisation",
          }}
        />
        <p className="ml-3"><a href="https://owo.quebec/legal/tos" target="_blank">🔗 Voir les détails </a></p>

        <Button variant="primary" type="submit" className="mb-2 w-100">
          Sign Up
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
RegisterForm.propTypes = {};

export default RegisterForm;
