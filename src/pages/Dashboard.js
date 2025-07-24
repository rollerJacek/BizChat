import React from 'react';
import Chat from '../components/Chat';
import HRPortal from '../components/HRPortal';
import Calendar from '../components/Calendar';
import TaskManager from '../components/TaskManager';
import AnnouncementBoard from '../components/AnnouncementBoard';
import WorkTimeTracker from '../components/WorkTimeTracker';
import AdminPanel from '../components/AdminPanel';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <Chat />
      <HRPortal />
      <Calendar />
      <TaskManager />
      <AnnouncementBoard />
      <WorkTimeTracker />
      <AdminPanel />
    </div>
  );
};

export default Dashboard;
