const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Kierownik tworzy zadanie
router.post('/', authMiddleware, roleMiddleware('kierownik'), taskController.createTask);
// Pobranie zadań
router.get('/', authMiddleware, taskController.getTasks);
// Aktualizacja statusu zadania
router.put('/status', authMiddleware, taskController.updateTaskStatus);
// Dodanie komentarza do zadania
router.put('/comment', authMiddleware, taskController.addTaskComment);

module.exports = router;
