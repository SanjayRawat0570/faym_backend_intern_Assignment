const express = require('express');
const router = express.Router();
const { getEventCount, getEventCountsByType } = require('../controllers/analyticsController');

router.get('/event-counts', getEventCount);
router.get('/event-counts-by-type', getEventCountsByType);

module.exports = router;