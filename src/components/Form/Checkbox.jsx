import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = ({ name, label, rules, placeholder, register, error }) => {

  return (
    <Form.Group className="mb-2" controlname={name}>
      <Form.Check
        id={name}
        label={label}
        isInvalid={!!error}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {error && (
        <Form.Text className="text-danger">
          {error.message}
        </Form.Text>
      )}
    </Form.Group>
  )
}


export default Checkbox;
