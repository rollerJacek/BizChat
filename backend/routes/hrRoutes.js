const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Dodanie zgłoszenia HR
router.post('/', authMiddleware, hrController.submitRequest);
// Pobranie zgłoszeń HR
router.get('/', authMiddleware, hrController.getRequests);
// Aktualizacja statusu – tylko dla kierownika
router.put('/', authMiddleware, roleMiddleware('kierownik'), hrController.updateRequestStatus);

module.exports = router;
