import useAuthentication from '@/authentication/useAuthentication';
import React, { useState } from 'react';
import { Container, Form, Button, Nav, Card, Tab, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import InputText from '@/components/Form/InputText';


const RegisterForm = ({ }) => {
  const { register: registerUser } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted }
  } = useForm({ reValidateMode: "onChange" });


  const onSubmit = async ({ email, password, username, name }) => {
    await registerUser({ email, password, username, name })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={isDirty || isSubmitted ? 'was-validated' : ''} noValidate>
      {/*
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


      <InputText
        name="name"
        label="Nom complet"
        rules={{
          required: "Entrez votre nom",
        }}
        placeholder="Entrez votre nom"
        register={register}
        errors={errors}
      />

      <InputText
        name="username"
        label="Username"
        rules={{
          required: "Entrez un nom d'utilisateur",
        }}
        placeholder="Entrez un nom d'utilisateur"
        register={register}
        errors={errors}
      />
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
          required: "Entrez un mot de passe",
        }}
        register={register}
        errors={errors}
      />
      <InputText
        name="password2"
        type="password"
        label="Password"
        rules={{
          required: "Entrez un mot de passe",
          validate: {
            validate: (val) => {
              if (watch('password') != val) {
                return "Your passwords do no match";
              }
            },
          }
        }}
        register={register}
        errors={errors}
      />


      <Form.Group className='d-flex justify-content-center mb-2'>
        <Form.Check type='checkbox' label='I have read and agree to the terms' {...register('tos')} />
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-2 w-100">
        Sign Up
      </Button>
    </Form>
  )
}
RegisterForm.propTypes = {};

export default RegisterForm;
