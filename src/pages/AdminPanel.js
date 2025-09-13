import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseApiURL from '../utils/helpers';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/main.css';

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
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content-container page-container">
          <main className="page-content">
            <div className="admin-module">
              <div className="admin-header">
                <h2>Zarządzanie użytkownikami</h2>
                <button className="add-user-btn" id="add-user-btn" title="Dodaj nowego użytkownika">
                  <i className="fas fa-plus"></i> Dodaj
                </button>
              </div>
              <div className="admin-user-list" id="user-list">
                <div className="user-row header-row">
                  <div>ID</div>
                  <div>Imię i nazwisko</div>
                  <div>Dział</div>
                  <div>Typ konta</div>
                  <div className="actions-header">Edycja</div>
                  <div className="actions-header">Dezaktywacja</div>
                </div>
                {users.map(user => (
                  <div className="user-row" key={user.id} data-id="101" data-imie="Jan Kowalski" data-dzial="IT" data-typ="Admin" data-stanowisko="Administrator Systemu" data-adres="ul. Testowa 1, Warszawa" data-email="jan.kowalski@firma.pl" data-telefon="111-222-333">
                    <div>{user.id}</div>
                    <div>{user.username}</div>
                    <div>{user.department_id}</div>
                    <div>{user.role}</div>
                    <div><button className="icon-button edit-btn" title="Edytuj"><i className="fas fa-pencil-alt"></i></button></div>
                    <div><button className="icon-button deactivate-btn" title="Dezaktywuj"><i className="fas fa-user-slash"></i></button></div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="modal-overlay" id="user-modal">
        <div className="modal-content">
          <button className="modal-close" id="user-modal-close">&times;</button>
          <h3 id="modal-title">Edytuj dane</h3>
          <form id="user-form" onSubmit={handleSubmit} >
            <input type="hidden" id="edit-user-id"/>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-imie">Imię i nazwisko</label>
                  <input type="text" id="edit-imie" name="username" value={newUser.username} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="edit-dzial">Dział</label>
                  <input type="text" id="edit-dzial" name="department_id" value={newUser.department_id} onChange={handleChange} required/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="edit-stanowisko">Stanowisko</label>
                <input type="text" id="edit-stanowisko" required/>
              </div>
              <div className="form-group">
                <label htmlFor="edit-adres">Adres zamieszkania</label>
                <input type="text" id="edit-adres" required/>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-email">Adres e-mail</label>
                  <input type="email" id="edit-email" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="edit-telefon">Telefon</label>
                  <input type="tel" id="edit-telefon" required/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="edit-typ">Rodzaj konta</label>
                <select id="edit-typ" name="role" value={newUser.role} onChange={handleChange} required>
                  <option value="pracownik">Pracownik</option>
                  <option value="kierownik">Kierownik</option>
                  <option value="sekretariat">HR</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <hr/>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="edit-pass1">Nowe hasło</label>
                    <input type="password" id="edit-pass1" name="password" value={newUser.password} onChange={handleChange} placeholder="Pozostaw puste, by nie zmieniać"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-pass2">Powtórz hasło</label>
                    <input type="password" id="edit-pass2"/>
                  </div>
                </div>
                <button type="submit" className="modal-button" id="save-user-btn">Zapisz zmiany</button>
              </form>
            </div>
        </div>


        <div className="modal-overlay" id="deactivate-user-modal">
          <div className="modal-content">
            <h3>Potwierdzenie</h3>
            <p>Czy na pewno chcesz dezaktywować konto użytkownika <strong id="user-to-deactivate-name"></strong>?</p>
            <div className="modal-actions">
              <button className="modal-button cancel-btn" id="cancel-deactivate-btn">Nie</button>
              <button className="modal-button delete-confirm-btn" id="confirm-deactivate-btn">Tak, dezaktywuj</button>
            </div>
          </div>
        </div>
      </>
      );
};

      export default AdminPanel;
