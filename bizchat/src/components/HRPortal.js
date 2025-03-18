import React, { useState, useEffect } from 'react';
import hrService from '../services/hrService';

const HRPortal = () => {
  const [type, setType] = useState('urlop');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const data = await hrService.getRequests();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await hrService.submitRequest(type, startDate, endDate);
    fetchRequests();
  };

  return (
    <div>
      <h2>Portal HR</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Typ zgłoszenia:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="urlop">Urlop</option>
            <option value="praca_zdalna">Praca zdalna</option>
          </select>
        </div>
        <div>
          <label>Data rozpoczęcia:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
        </div>
        <div>
          <label>Data zakończenia:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
        </div>
        <button type="submit">Wyślij zgłoszenie</button>
      </form>
      <h3>Twoje zgłoszenia</h3>
      <ul>
        {requests.map(req => (
          <li key={req.id}>{req.type} od {req.start_date} do {req.end_date} - {req.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default HRPortal;
