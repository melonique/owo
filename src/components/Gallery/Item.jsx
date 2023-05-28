
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const GalleryItem = ({}) => (
  <Card className="mb-3">
    <Card.Img
      variant="top"
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
    />
    <Card.Body>
      <Badge>New</Badge>
      <Card.Title><a href="#!">Product name</a></Card.Title>
      <Card.Text>
        <a href="#!">Category</a>
      </Card.Text>
      <Card.Text>$61.99</Card.Text>
    </Card.Body>
  </Card>
);

export default GalleryItem;
