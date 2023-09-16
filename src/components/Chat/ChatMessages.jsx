import PropTypes from 'prop-types';
import React from 'react';

const ChatMessages = ({ component, messages, currentUser }) => {
  const Comp = component
  return (
    <>
      {messages.map((message) => (
        <Comp
          key={message.id}
          avatar={message.user.avatar}
          content={message.content}
          timestamp={message.timestamp}
          type={message.type}
          isCurrentUser={message.user.id == currentUser.id}
        />
      ))}
      </>
  );
  }
ChatMessages.propTypes = {};

export default ChatMessages;
