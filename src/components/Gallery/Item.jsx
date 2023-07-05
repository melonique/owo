
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';


const GalleryItem = ({ listing : { id, owner, title, description, type, tags }}) => (
  <Card className="mb-3">
    <Card.Img
      variant="top"
      src={"http://placekitten.com/600/400"}
    />
    <Card.Body>

      {type?.map(label => {
        return (<Badge key={label} bg="secondary">{label}</Badge>)
      })}

      <Card.Title><a href="#!">{title}</a></Card.Title>
      <Card.Subtitle><a href="#!">{description}</a></Card.Subtitle>

      {tags?.map(label => {
        return (<Card.Text key={label}><a href="#!">{label}</a></Card.Text>)
      })}

    </Card.Body>
  </Card>
);

export default GalleryItem;
