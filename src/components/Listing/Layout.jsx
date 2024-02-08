import React, { Fragment } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import ReactTimeAgo from 'react-time-ago'

const ItemLayout = ({ title, image, description, footer }) => (
  <Card className="mb-3">
    <Card.Header>
      <Card.Title>
        {title}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Row>
        {image &&
          <Col sm={4} xs={12}>
            <Card.Img
              src={image}
            />
          </Col>
        }
        <Col>
          <Card.Text>
            {description}
          </Card.Text>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      {footer}
    </Card.Footer>
  </Card>
);

export default ItemLayout;
