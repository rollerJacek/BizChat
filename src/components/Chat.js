import React, { useState, useEffect } from 'react';
import chatService from '../services/chatService';
import '../styles/main.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const fetchMessages = async () => {
    const data = await chatService.getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      await chatService.sendMessage(input);
      setInput('');
      fetchMessages();
    }
  };

  return (
    <div className="main-chat-area" id="main-chat-area">
      <div className="chat-header">
        <h2 id="chat-title">Ogólny</h2>
      </div>

      <div className="chat-window" id="chat-window">
        {messages.map((msg) => (
          <div className="message received" key={msg.id}>
            <div className="message-header">
              <div className="message-sender">{msg.username}</div>
            </div>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="message-input-area">
        <input type="text" id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Wpisz wiadomość..." />
        <button onClick={handleSend}>Wyślij</button>
      </div>
    </div>
  );
};

export default Chat;
