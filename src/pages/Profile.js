import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content-container page-container">
          <main className="page-content">
            <div className="profile-card">
              <div className="profile-avatar">
                <i className="fas fa-user-tie"></i>
              </div>
              <h2>Jan Kowalski</h2>
              <p className="profile-position">Administrator Systemu</p>

              <ul className="profile-details">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>ul. Przykładowa 1, 00-001 Warszawa</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>jan.kowalski@firma.pl</span>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <span>+48 500 600 700</span>
                </li>
                <li>
                  <i className="fas fa-user-shield"></i>
                  <span>Rodzaj konta: <strong>Administrator</strong></span>
                </li>
              </ul>
            </div>

            <div className="profile-links">
              <a href="ustawienia.html" className="profile-link-item">
                <i className="fas fa-cog"></i>
                <span>Ustawienia konta</span>
              </a>
              <a href="polityka-prywatnosci.html" className="profile-link-item">
                <i className="fas fa-shield-alt"></i>
                <span>Polityka prywatności</span>
              </a>
              <a href="manual.html" className="profile-link-item">
                <i className="fas fa-book-open"></i>
                <span>Instrukcja obsługi</span>
              </a>
              <button id="logout-btn-profile" onClick={handleLogout} className="profile-link-item danger-action">
                <i className="fas fa-sign-out-alt"></i>
                <span>Wyloguj</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
