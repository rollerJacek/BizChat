import React from 'react';
import './styles/components.css'

const Notification = ({ message }) => {
  if (!message) return null;
  return (
    <div class="notification">
      {message}
    </div>
  );
};

export default Notification;
