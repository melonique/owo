import { useEffect, useState } from 'react'
import { Form, Card, Nav, Button } from 'react-bootstrap'
import cn from 'classnames'

import { AiOutlineCamera } from 'react-icons/ai'

const PictureInput = ({ name, label, rules, placeholder, register, error, setValue }) => {
  const [base64String, setBase64String] = useState(null)
  const [input, setInput] = useState(null)

  useEffect(() => {
    if (!input) {
      const inpt = register(name)
      setInput(inpt)
    }
    setValue(name, base64String)
    return () => {}
  }, [setInput, base64String, input, name, register, setValue])

  const onPictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBase64String(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetImage = () => {
    setBase64String(null)
  }

  return (
    <Form.Group className="mb-2  d-flex flex-column align-items-center align-content-center" controlname={name}>
      <Form.Label
        htmlFor={name}
        className={
          cn(
            'btn btn-block btn-lg btn-outline-dark py-5 rounded-sm flex-column align-items-center align-content-center',
            !!base64String ? 'd-none' : 'd-flex')
        }>
        <Form.Control
          id={name}
          type="file"
          isInvalid={!!error}
          placeholder={placeholder}
          className="d-none"
          onChange={onPictureChange}
        />
        <AiOutlineCamera />
        <span>
          {label}
        </span>
        {error && (
          <Form.Text className="text-danger">
            {error.message}
          </Form.Text>
        )}
      </Form.Label>
      <Card className={cn('rounded-sm', !!base64String ? 'd-block' : 'd-none', 'rounded-sm')}>
        <Card.Img
          variant="top"
          src={`${base64String}`}
        />
        <Card.Footer>
          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
              <Button variant="link" className="px-0" onClick={resetImage}>&lt; Cancel</Button>
            </Nav.Item>
            <Nav.Item className="ml-auto">
              <Button variant="success" type="submit">Submit &gt;</Button>
            </Nav.Item>
          </Nav>
        </Card.Footer>
      </Card>

    </Form.Group>
  )
}

export default PictureInput
