import { Form } from 'react-bootstrap';
import cn from 'classnames'

const Textarea = ({ name, label, rules, placeholder, register, error, exemple, rows = 3 }) => {
  return (
    <Form.Group className="mb-3" controlname={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={rows}
        className={cn('py-2 px-3', error ? 'is-invalid' : '')}
        isInvalid={error}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {error && (
        <Form.Text className="text-danger">
          {error.message}
        </Form.Text>
      )}
      {!!exemple && (
        <Form.Text className="text-muted">
          {exemple}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default Textarea;
