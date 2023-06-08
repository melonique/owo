
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';


const GalleryItem = ({ listing : { id, owner, title, description, images, price, availability, location, type }}) => (
  <Card className="mb-3">
    <Card.Img
      variant="top"
      src={"http://placekitten.com/600/400"}
    />
    <Card.Body>
      <Badge bg="secondary">{type}</Badge>
      <Card.Title><a href="#!">{title}</a></Card.Title>
      <Card.Text>
        <a href="#!">Category</a>
      </Card.Text>
      <Card.Text>${price}</Card.Text>
    </Card.Body>
  </Card>
);

export default GalleryItem;
