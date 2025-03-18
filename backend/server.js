const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');

// Import tras
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const hrRoutes = require('./routes/hrRoutes');
const taskRoutes = require('./routes/taskRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rejestracja endpointów
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
