import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [calendarData, setCalendarData] = useState({ hrRequests: [], worktime: [] });

  const fetchCalendarData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/calendar', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCalendarData(response.data);
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  return (
    <div>
      <h2>Kalendarz</h2>
      <h3>Zgłoszenia HR</h3>
      <ul>
        {calendarData.hrRequests.map(req => (
          <li key={req.id}>{req.type} od {req.start_date} do {req.end_date}</li>
        ))}
      </ul>
      <h3>Czas pracy</h3>
      <ul>
        {calendarData.worktime.map(session => (
          <li key={session.id}>User {session.user_id}: {session.login_time} - {session.logout_time || 'W trakcie'}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
