import React from "react";
import { Form as BForm } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Form = ({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <BForm onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.cloneElement(child.type, {
            ...{
              ...child.props,
              register: methods.register,
              key: child.props.name
            }
          })
          : child;
      })}
    </BForm>
  );
}

export default Form
