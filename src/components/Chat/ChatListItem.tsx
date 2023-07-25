import React from "react";
import Link from 'next/link'
import { Message, User } from "@/types/ChatTypes";


interface ChatListItemProps {
  id: string;
  title: string;
  user: User;
  messages: Message[];
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  id, title, user, messages
}) => {

  return (
    <li className="p-2 border-bottom">
      <Link href={`/messages/${id}`} className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src={user.avatar}
              alt="avatar"
              className="d-flex align-self-center me-3"
              width="60"
            />
          </div>
          <div className="pt-1">
            <p className="fw-bold mb-0">{user.username}</p>
            <p className="small text-muted">{title}</p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">{messages.length} messages</p>
        </div>
      </Link>
    </li>
  );
};

export default ChatListItem;
