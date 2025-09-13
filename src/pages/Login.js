import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem("role", response.user.role);
      navigate('/');
    } catch (err) {
      alert('Login failed ' + err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-promo-panel">
          <div className="promo-content">
            <i className="fas fa-network-wired"></i>
            <h1>BizChat</h1>
            <p>Twoje centrum zarządzania i komunikacji w jednym miejscu.</p>
          </div>
        </div>
        <div className="login-form-panel">
          <div className="form-content">
            <form className="login-form-panel" onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label for="username" >Nazwa użytkownika:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

              </div>
              <div className="login-form-group">
                <label for="password" >Hasło:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="login-button" >Zaloguj</button>
            </form>
          </div>
        </div>
        <div className="login-actions-corner">
          <a href="manual.html" className="login-action-btn" title="Instrukcja obsługi">
            <i className="fas fa-question-circle"></i>
          </a>
          <button id="theme-toggle-btn" className="login-action-btn" title="Zmień motyw">
            <i className="fas fa-sun"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
