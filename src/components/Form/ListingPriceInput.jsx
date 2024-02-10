import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import cn from 'classnames';

const ListingPriceInput = ({ name, label, rules, register, error, placeholder, setValue }) => {
  const [ isFree, setIsFree ] = useState(true);

  const onSwitchChange = (e) => {
    const isChecked = e.target.checked;
    setIsFree(isChecked)
    if (isChecked) {
      setValue(name, 0)
    }
  }

  return (
      <Form.Group className="mp-3" controlname={name}>
      <Form.Label>{label}</Form.Label>
      <div className="d-flex flex-row">
      <Form.Check
        type="switch"
        className={cn('px-5 switch-lg', isFree && 'text-success'  )}
        id={`switch-${name}`}
        label={isFree ? 'Gratuit!' : 'Prix: '}
        onChange={onSwitchChange}
        checked={isFree}
      />

      <InputGroup className="mb-3">
        <Form.Control
          id={name}
          type="number"
          label={label}
          isInvalid={!!error}
          placeholder={placeholder}
          defaultValue={0}
          className="text-right"
          disabled={isFree}
          {...register(name, rules)}
        />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
      </div>

      {error && (
        <Form.Text className="text-danger">
          {error.message}
        </Form.Text>
      )}
    </Form.Group>
  )
}

export default ListingPriceInput;
