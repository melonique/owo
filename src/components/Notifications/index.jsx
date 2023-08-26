import React from 'react';
import SingleNotification from './SingleNotification';
import { Row, Col, Container } from "react-bootstrap";

const Notifications = ({ notifications }) => {
  return (
    <Container>
      {notifications.map((notification, index) => (
        <Row key={index} className="pt-3"><Col><SingleNotification  {...notification} /></Col></Row>
      ))}
    </Container>
  )
}

export default Notifications;
