import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseApiURL from '../utils/helpers';
import Navbar from '../components/Navbar';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '', department_id: '' });

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(baseApiURL.url + '/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(baseApiURL.url + '/api/admin/users', newUser, { headers: { Authorization: `Bearer ${token}` } });
    setNewUser({ username: '', password: '', role: '', department_id: '' });
    fetchUsers();
  };

  return (
    <div>
        <Navbar />
      <h2>Panel Administracyjny</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={newUser.username} onChange={handleChange} placeholder="Nazwa użytkownika" required/>
        <input name="password" type="password" value={newUser.password} onChange={handleChange} placeholder="Hasło" required/>
        <input name="role" value={newUser.role} onChange={handleChange} placeholder="Rola (admin, kierownik, pracownik, sekretariat)" required/>
        <input name="department_id" value={newUser.department_id} onChange={handleChange} placeholder="ID Działu" required/>
        <button type="submit">Dodaj użytkownika</button>
      </form>
      <h3>Lista użytkowników</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
