import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/main.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = async () => {
        await authService.logout();
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <aside className="sidebar" id="sidebar">
            <nav className="sidebar-menu">
                <Link to="/" className="user-profile-link">
                    <i className="fas fa-comments"></i> <span>Komunikator</span>
                </Link>
                <Link to="/workflow"><i className="fas fa-project-diagram"></i> <span>Workflow</span></Link>
                <Link to="/tasks"><i className="fas fa-tasks"></i> <span>Zadania</span></Link>
                <Link to="/profile"><i className="fas fa-user-circle"></i> <span>Profil</span></Link>
                {role == "admin" &&<Link to="/admin"><i className="fas fa-user-shield"></i> <span>Panel Admina</span></Link>}
                <Link to="/settings"><i className="fas fa-cog"></i> <span>Ustawienia</span></Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
