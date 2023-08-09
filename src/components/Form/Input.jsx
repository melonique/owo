import React from 'react';
import { Form } from 'react-bootstrap';


const Input = ({ name, label, rules, placeholder, register, errors, type = 'text' }) => {

  return (
    <Form.Group className="mb-3" controlname={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        className={errors[name] ? 'is-invalid' : ''}
        isInvalid={errors[name]}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {errors[name] && (
        <Form.Text className="text-danger">
          {errors[name].message}
        </Form.Text>
      )}
    </Form.Group>
  )
}


export default Input;
