import PropTypes from 'prop-types';
import React from 'react';
import SingleNotification from './SingleNotification';
import { Row, Col, Container } from "react-bootstrap";

const NOTIFICATIONS = [
  { id: 1, excerpt: "Alexandre consigny: Salut Véro! J'aime tes belle....", createdAt: "2023-08-25T03:40:18.751558+00:00", status: "new", context: { conversationId: 'fecc9257-92d1-4158-a122-333a738aed9c' }, type: "message" },
  { id: 2, excerpt: "Alexandre consigny: Salut Véro! J'aime tes belle....", createdAt: "2023-08-25T03:40:18.751558+00:00", status: "new", context: { conversationId: 'fecc9257-92d1-4158-a122-333a738aed9c' }, type: "message" },
  { id: 3, excerpt: "Alexandre consigny: Salut Véro! J'aime tes belle....", createdAt: "2023-08-25T03:40:18.751558+00:00", status: "new", context: { conversationId: 'fecc9257-92d1-4158-a122-333a738aed9c' }, type: "message"},

]
const Notifications = ({}) => {
  return (
    <Container>
      {NOTIFICATIONS.map((notification, index) => (
        <Row key={index} className="pt-3"><Col><SingleNotification  {...notification} /></Col></Row>
      ))}
    </Container>
  )
}

Notifications.propTypes = {};

export default Notifications;
