import React from "react";

interface MessageProps {
  avatar?: string;
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
  const date = new Date(timestamp)
  const text = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
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
        <p
          className={`small p-2 ${!isCurrentUser ? 'me-3 text-white bg-info' : 'text-primary ms-3'} mb-1 rounded-3`}
          style={{ backgroundColor: !isCurrentUser ? "#007BFF" : "#f5f6f7" }}
        >
          {content.split("\n").map(l => <>{l}<br/></>)}
        </p>
        <p className={`time small rounded-3 text-muted`}>
          {text}
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
