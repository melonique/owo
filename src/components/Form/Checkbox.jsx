import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = ({ name, label, rules, placeholder, register, errors }) => {

  return (
    <Form.Group className="mb-2" controlname={name}>
      <Form.Check
        id={name}
        label={label}
        isInvalid={!!errors[name]}
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


export default Checkbox;
