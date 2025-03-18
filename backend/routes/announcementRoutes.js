const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Sekretariat dodaje ogłoszenie
router.post('/', authMiddleware, roleMiddleware('sekretariat'), announcementController.createAnnouncement);
// Pobranie ogłoszeń
router.get('/', authMiddleware, announcementController.getAnnouncements);

module.exports = router;
