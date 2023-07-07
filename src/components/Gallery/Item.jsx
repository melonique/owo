
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const borderTypes = {
  'don': 'primary',
  'vente': 'secondary',
  'pret': 'info',
}

const GalleryItem = ({ listing : { id, owner, title, description, type, tags }}) => (
  <Card className="mb-3" border={type && type.length ? borderTypes[type[0]] : 'primary'}>

    <Card.Body>
      <Row>
        <Col xs={2}>
          <Card.Img
            src={"https://api.multiavatar.com/" + owner + '.png'}
            alt="avatar"
            className="rounded-circle"
            style={{ width: '80px' }}
            fluid
          />
          UserName
        </Col>
      <Col className="text-left">
          <Card.Title border="primary">
            {title} titre de ce qui est a offrir
          </Card.Title>

          <Card.Text>{description}</Card.Text>

          <Row>
            <Col>
              {type?.map(label => {
                return (<Badge key={label} bg={borderTypes[label]} className="text-white">{label}</Badge>)
              })}
            </Col>
            <Col className="text-right"><Button>Contacter</Button></Col>
          </Row>


        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default GalleryItem;
