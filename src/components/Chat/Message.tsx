import React from "react";

interface MessageProps {
  avatar: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

const Message: React.FC<MessageProps> = ({
  avatar,
  content,
  timestamp,
  isCurrentUser = false,
}) => {
  return (
    <div className={`d-flex flex-row justify-content-${!isCurrentUser ? 'start' : 'end'} ${!isCurrentUser ? 'text-left' : 'text-right'} mb-4`}>
      {!isCurrentUser && (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "45px", height: "100%" }}
        />
      )}
      <div>
        <p
          className={`small p-2 ${!isCurrentUser ? 'me-3 text-white bg-primary' : 'ms-3'} mb-1 rounded-3`}
          style={{ backgroundColor: !isCurrentUser ? "#007BFF" : "#f5f6f7" }}
        >
          {content}
        </p>
        <p className={`small ${isCurrentUser ? 'me-3' : 'ms-3'} mb-3 rounded-3 text-muted`}>
          {timestamp}
        </p>
      </div>
      {isCurrentUser && (
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
