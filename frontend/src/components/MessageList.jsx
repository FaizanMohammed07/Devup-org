import { useEffect, useState } from "react";
import { fetchMessages } from "../services/api";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await fetchMessages();
      setMessages(res.data);
    };
    getMessages();
  }, []);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.refId} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-bold text-lg">{msg.title}</h2>
          <p className="mt-2">{msg.body}</p>
          <div className="mt-2 text-sm text-gray-600">
            <p>👤 Name: {msg.author.name}</p>
            <p>Role: {msg.author.role}</p>
            <p>Team: {msg.author.team}</p>
            <p>🕒 {new Date(msg.createdAt).toLocaleString()}</p>
            <p>🆔 Ref ID: {msg.refId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
