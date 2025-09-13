import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/main.css';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    // <nav style={{ background: '#333', color: '#fff', padding: '10px' }}>
    //   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //     <div>
    //       <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
    //         Chat
    //       </Link>
    //       <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
    //         Profil
    //       </Link>
    //       {role == "admin" && <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}> Admin </Link>}
    //     </div>
    //     <button
    //       onClick={handleLogout}
    //       style={{
    //         background: 'transparent',
    //         color: '#fff',
    //         border: 'none',
    //         cursor: 'pointer'
    //       }}
    //     >
    //       Wyloguj
    //     </button>
    //   </div>
    // </nav>

    <header className="header">
      <div className="header-left">
        <button id="menu-btn"><i className="fas fa-bars"></i></button>
        <button id="toggle-chat-list-btn"><i className="fas fa-comments"></i></button>
        <h1>HR Portal</h1>
      </div>
      <div className="header-right">
        <div className="working-time">Czas pracy: <span id="working-timer">00:00:00</span></div>
        <button id="theme-toggle-btn"><i className="fas fa-sun"></i></button>
        <Link to="/profile" className="user-profile-link">
          <div className="user-profile">
            <i className="fas fa-user"></i>
          </div>
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
