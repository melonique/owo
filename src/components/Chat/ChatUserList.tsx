import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link'
import { ListGroup, Badge } from 'react-bootstrap';
import { Conversation } from '@/types/ChatTypes';

type ChatUserListProps = {
  conversations: Conversation[],
  currentChatId: string
}

const ChatUserList = ({ conversations, currentChatId }: ChatUserListProps) => {

  return (
    <ListGroup as="ol" variant="flush">
      {conversations.map((chat: Conversation) => (
        <ListGroup.Item
          key={chat.id}

          active={chat.id === currentChatId}
          action href={`/messages/${chat.id}`}
          as={Link}
          className="d-flex justify-content-between align-items-start text-left"
        >
          <div className="d-flex flex-row">
            <div>
              <img
                src={chat.user.avatar}
                alt="avatar"
                className="d-flex align-self-center me-3"
                width="60"
              />
            </div>
            <div className="">
              <p className="fw-bold mb-0">{chat.user.username}</p>
              <p className="small text-muted">{chat.title}</p>
            </div>
          </div>
          <Badge bg="primary" pill>
            {chat.messages.length}
          </Badge>
        </ListGroup.Item>

      ))}
    </ListGroup>
);
  }

ChatUserList.propTypes = {};

export default ChatUserList;
