import { MessageType } from "@/types/ChatTypes";
import React, { Fragment } from "react";
import ReactTimeAgo from 'react-time-ago'

interface MessageProps {
  avatar?: string;
  content: string;
  timestamp: string;
  type?: MessageType;
  isCurrentUser?: boolean;
}

const Message: React.FC<MessageProps> = ({
  avatar,
  content,
  timestamp,
  type,
  isCurrentUser = false,
}) => {
  return (
    <div className={`chat-message d-flex flex-row justify-content-${!isCurrentUser ? 'start' : 'end'} ${!isCurrentUser ? 'text-left' : 'text-right'}`}>
      {!isCurrentUser && avatar && (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "45px", height: "100%" }}
        />
      )}
      <div>
        {type === 'image' && (
          <img src={content} alt="image" style={{ width: "100%" }} />
          )}

        {type !== 'image' && (
          <p
            className={`small p-2 ${!isCurrentUser ? 'me-3 text-white bg-info' : 'text-primary ms-3'} mb-1 rounded-3`}
            style={{ backgroundColor: !isCurrentUser ? "#007BFF" : "#f5f6f7" }}
          >
            {content.split("\n").map(l => <Fragment key={l}>{l}<br /></Fragment>)}
          </p>
        )}


        <p className={`time small rounded-3 text-muted`}>
          <ReactTimeAgo date={new Date(timestamp)} locale="fr" />
        </p>
      </div>
      {isCurrentUser && avatar && (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "45px", height: "100%" }}
        />
      )}
    </div>
  );
};

export default Message;
