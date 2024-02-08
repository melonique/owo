import React from "react"
import { useForm } from "react-hook-form"
import { Form  as BForm } from "react-bootstrap"


export default function Form({ defaultValues, children, onSubmit }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted }
  } = useForm({
    reValidateMode: "onChange",
    // defaultValues: initialValues
  });



  return (
    <BForm onSubmit={handleSubmit(onSubmit)} className={isDirty || isSubmitted ? 'was-validated' : ''} noValidate>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
            ...{
              ...child.props,
              register,
              setValue,
              error: errors[child.props.name],
              key: child.props.name,
            },
          })
          : child
      })}
    </BForm>
  )
}
