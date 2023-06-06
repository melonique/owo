import useAuthentication from '@/authentication/useAuthentication';
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import InputText from '@/components/Form/InputText';

console.log(InputText)
const Login = ({ }) => {
  const { login } = useAuthentication();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitted }
  } = useForm({

    reValidateMode: "onChange",
    // defaultValues: initialValues
  });


  const onSubmit = async ({ email, password, remember }) => {
    await login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={isDirty || isSubmitted ? 'was-validated' : ''} noValidate>
      {/*
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

      <InputText
        name="email"
        type="email"
        label="Courriel"
        rules={{
          required: "Entrez votre courriel",
          pattern: { value: /\S+@\S+\.\S+/, message: "Entered value does not match email format" }
        }}
        placeholder="Entrez votre courriel"
        register={register}
        errors={errors}

      />

      <InputText
        name="password"
        type="password"
        label="Password"
        rules={{
          required: "Entrez votre mot de passe"
        }}
        placeholder=""
        register={register}
        errors={errors}
      />

      <Form.Group className="d-flex justify-content-between mb-2">
        <Form.Check type="checkbox" label="Remember me" {...register('remember')} />
        <Card.Link href="#">Forgot password?</Card.Link>
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-2 w-100">
        Sign In
      </Button>
    </Form>
  )
}
Login.propTypes = {};

export default Login;
