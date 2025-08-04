import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import userService from '../services/userService';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '', department_id: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.username && newUser.password && newUser.role && newUser.department_id) {
      const newUserWithId = {
        ...newUser,
        id: users.length + 1,
        department_name: 'Nowy Dział'
      };
      setUsers([...users, newUserWithId]);
      setNewUser({ username: '', password: '', role: '', department_id: '' });
      setSuccess('Użytkownik został dodany pomyślnie');
      setError('');
    } else {
      setError('Proszę wypełnić wszystkie pola');
      setSuccess('');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#dc3545';
      case 'kierownik': return '#ffc107';
      case 'pracownik': return '#007bff';
      case 'sekretariat': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '30px' }}>Panel Administracyjny</h1>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '400px',
            flex: 1
          }}>
            <h3 style={{ marginBottom: '20px' }}>Dodaj nowego użytkownika</h3>
            
            {error && (
              <div style={{ 
                background: '#f8d7da', 
                color: '#721c24', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '15px' 
              }}>
                {error}
              </div>
            )}
            
            {success && (
              <div style={{ 
                background: '#d4edda', 
                color: '#155724', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '15px' 
              }}>
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Nazwa użytkownika:
                </label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Hasło:
                </label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Rola:
                </label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Wybierz rolę</option>
                  <option value="admin">Admin</option>
                  <option value="kierownik">Kierownik</option>
                  <option value="pracownik">Pracownik</option>
                  <option value="sekretariat">Sekretariat</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  ID Działu:
                </label>
                <input
                  type="number"
                  name="department_id"
                  value={newUser.department_id}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Dodaj użytkownika
              </button>
            </form>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '400px',
            flex: 1
          }}>
            <h3 style={{ marginBottom: '20px' }}>Lista użytkowników</h3>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {users.map((user, index) => (
                <div
                  key={user.id}
                  style={{
                    padding: '15px',
                    borderBottom: index < users.length - 1 ? '1px solid #eee' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      {user.username}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Dział: {user.department_name}
                    </div>
                  </div>
                  <span style={{
                    background: getRoleColor(user.role),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
