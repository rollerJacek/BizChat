import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const Settings = () => {
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
                        <div className="settings-module">
                            <h3>Powiadomienia</h3>
                            <div className="setting-item">
                                <span>Powiadomienia o nowych wiadomościach</span>
                                <label className="toggle-switch">
                                    <input type="checkbox" checked></input>
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <span>Powiadomienia o nowych zadaniach</span>
                                <label className="toggle-switch">
                                    <input type="checkbox" checked></input>
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <span>Powiadomienia mailowe</span>
                                <label className="toggle-switch">
                                    <input type="checkbox"></input>
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="settings-module">
                            <h3>Wygląd</h3>
                            <div className="setting-item">
                                <span>Tryb ciemny</span>
                                <label className="toggle-switch">
                                    <input type="checkbox" id="theme-toggle-switch-page" checked></input>
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="settings-module">
                            <h3>Konto</h3>
                            <div className="setting-item">
                                <span>Zmień hasło</span>
                                <button className="settings-button">Zmień</button>
                            </div>
                            <div className="setting-item">
                                <span>Wyloguj</span>
                                <button className="settings-button danger" onClick={handleLogout} id="logout-btn">Wyloguj się</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Settings;
