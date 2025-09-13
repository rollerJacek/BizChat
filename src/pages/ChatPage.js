import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import userService from '../services/userService';
import '../styles/main.css';

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
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          <div className="tabs">
            <a href="#" className="active" data-chat-id="ogolny">Ogólny</a>
            <a href="#" data-chat-id="projekt-x">Projekt X</a>
            <a href="#" data-chat-id="it-support">Wsparcie IT</a>
            <a href="#" data-chat-id="hr">HR</a>
          </div>
          <main className="content">
            <div className="chat-sidebar" id="chat-sidebar">
              <div className="chat-sidebar-header">
                <h3>Czat</h3>
                <button id="toggle-chat-list-desktop-btn"><i className="fas fa-chevron-left"></i></button>
              </div>
              <div className="chat-list">
                <div className="chat-list-item active" data-chat-id="ogolny" data-chat-name="Grupa Ogólna">
                  <div className="avatar">OG</div>
                  <div className="chat-info">
                    <h4>Grupa Ogólna</h4>
                    <p>Ostatnia wiadomość...</p>
                  </div>
                </div>
                {users.map(user => (
                  <div className="chat-list-item" key={user.id}>
                    <div className="avatar">{Array.from(user.username)[0]}</div>
                    <div className="chat-info">
                      <h4>{user.username}</h4>
                      <p>Prywatny czat...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Chat />
          </main>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
