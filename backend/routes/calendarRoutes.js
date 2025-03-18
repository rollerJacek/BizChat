const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, calendarController.getCalendarData);

module.exports = router;
