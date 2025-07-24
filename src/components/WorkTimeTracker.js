import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkTimeTracker = () => {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/calendar', { headers: { Authorization: `Bearer ${token}` } });
    setSessions(response.data.worktime);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <h2>Śledzenie Czasu Pracy</h2>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            Użytkownik {session.user_id}: {session.login_time} - {session.logout_time || 'W trakcie'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkTimeTracker;
