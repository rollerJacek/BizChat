import React, { useState, useEffect } from 'react';
import chatService from '../services/chatService';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const fetchMessages = async () => {
    const data = await chatService.getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
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
    <div>
      <h2>Czat na żywo</h2>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Wpisz wiadomość"/>
      <button onClick={handleSend}>Wyślij</button>
    </div>
  );
};

export default Chat;
