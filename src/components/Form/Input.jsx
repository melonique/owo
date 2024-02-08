import React from 'react';
import { Form } from 'react-bootstrap';


const Input = ({ name, label, rules, placeholder, register, error, type = 'text', exemple }) => {

  return (
    <Form.Group className="mb-3" controlname={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        className={error ? 'is-invalid' : ''}
        isInvalid={error}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {error && (
        <Form.Text className="text-danger">
          {error.message}
        </Form.Text>
      )}
      { !!exemple && (
        <Form.Text className="text-muted">
          {exemple}
        </Form.Text>
      )}
    </Form.Group>
  )
}


export default Input;
