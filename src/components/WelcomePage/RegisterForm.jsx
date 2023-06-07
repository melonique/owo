import React from 'react';
import { Button } from 'react-bootstrap';
import useAuthentication from '@/authentication/useAuthentication';
import { Checkbox, Form, Input } from '@/components';


const RegisterForm = ({ }) => {
  const { register: registerUser } = useAuthentication();


  const onSubmit = async ({ email, password, username, name }) => {
    await registerUser({ email, password, username, name })
  }

  return (
    <Form onSubmit={onSubmit} >
      {/* import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
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
      */}


      <Input
        name="name"
        label="Nom complet"
        placeholder="Entrez votre nom"
        rules={{
          required: "Entrez votre nom",
        }}
      />

      <Input
        name="username"
        label="Username"
        placeholder="Entrez un nom d'utilisateur"
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
        label="I have read and agree to the terms" 
        rules={{
          required: "Acceptez les conditions d'utilisation",
        }}
      />

      <Button variant="primary" type="submit" className="mb-2 w-100">
        Sign Up
      </Button>
    </Form>
  )
}
RegisterForm.propTypes = {};

export default RegisterForm;
