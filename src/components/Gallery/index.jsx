import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

import Item from './Item'


const Gallery = ({}) => (
    <Container fluid className="text-center">
      <h4>
        <strong>Bestsellers</strong>
      </h4>

      <Row>
        <Col md={4} lg={4}>
          <Item />
        </Col>
        <Col md={4} lg={4}>
          <Item />
        </Col>
        <Col md={4} lg={4}>
          <Item />
        </Col>
        <Col md={4} lg={4}>
          <Item />
        </Col>
        <Col md={4} lg={4}>
          <Item />
        </Col>
        <Col md={4} lg={4}>
          <Item />
        </Col>
        <Col md={4} lg={4}>
          <Item />
        </Col>
      </Row>
    </Container>
);


export default Gallery;
