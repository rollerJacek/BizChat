import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const fetchTasks = async () => {
    const data = await taskService.getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await taskService.createTask(assignedTo, description, departmentId);
    fetchTasks();
  };

  const handleUpdateStatus = async (taskId, status) => {
    await taskService.updateTaskStatus(taskId, status);
    fetchTasks();
  };

  const handleAddComment = async (taskId, comment) => {
    await taskService.addTaskComment(taskId, comment);
    fetchTasks();
  };

  return (
    <div>
      <h2>Zarządzanie Zadaniami</h2>
      <form onSubmit={handleCreateTask}>
        <div>
          <label>Przydziel do (ID użytkownika):</label>
          <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required/>
        </div>
        <div>
          <label>Opis zadania:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
        </div>
        <div>
          <label>ID Działu:</label>
          <input type="text" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required/>
        </div>
        <button type="submit">Stwórz zadanie</button>
      </form>
      <h3>Lista zadań</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Opis:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <button onClick={() => handleUpdateStatus(task.id, 'w trakcie')}>W trakcie</button>
            <button onClick={() => handleUpdateStatus(task.id, 'skończone')}>Skończone</button>
            <div>
              <input type="text" placeholder="Dodaj komentarz" onBlur={(e) => handleAddComment(task.id, e.target.value)}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
