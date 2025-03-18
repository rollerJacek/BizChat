import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import userService from '../services/userService';

const ChatPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        <div
          style={{
            width: '250px',
            borderRight: '1px solid #ccc',
            padding: '10px',
            overflowY: 'auto'
          }}
        >
          <h3>Użytkownicy</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map(user => (
              <li key={user.id} style={{ marginBottom: '8px' }}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
