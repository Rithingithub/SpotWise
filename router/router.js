const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');
const moneyController = require('../controller/moneyController');

// Define routes
router.get('/data', dataController.getData);
router.post('/data', dataController.createData);
router.post('/calculateCost', moneyController.calculateCost); // New route for cost calculation

module.exports = router;
