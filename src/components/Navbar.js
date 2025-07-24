import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/components.css'

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
            Chat
          </Link>
          <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
            Profil
          </Link>
          {role == "admin" && <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}> Admin </Link>}
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Wyloguj
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
