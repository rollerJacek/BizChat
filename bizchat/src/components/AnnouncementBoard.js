import React, { useState, useEffect } from 'react';
import announcementService from '../services/announcementService';

const AnnouncementBoard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState('');

  const fetchAnnouncements = async () => {
    const data = await announcementService.getAnnouncements();
    setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    await announcementService.createAnnouncement(message);
    setMessage('');
    fetchAnnouncements();
  };

  return (
    <div>
      <h2>Tablica Ogłoszeń</h2>
      <form onSubmit={handleCreateAnnouncement}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Treść ogłoszenia" required></textarea>
        <button type="submit">Dodaj ogłoszenie</button>
      </form>
      <ul>
        {announcements.map(ann => (
          <li key={ann.id}>
            <p>{ann.message}</p>
            <small>{ann.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementBoard;
