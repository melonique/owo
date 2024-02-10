import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const AiFeedback = ({}) => {

  return (
    <ButtonGroup className="mb-2 text-muted ">
      <Button variant="outline-dark">
        <FaThumbsDown className="text-muted" />
      </Button>
      <Button variant="outline-dark"><FaThumbsUp className="text-muted"  /></Button>
    </ButtonGroup>
  )
}


export default AiFeedback;
