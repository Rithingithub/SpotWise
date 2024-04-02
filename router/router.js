const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');
const moneyController = require('../controller/moneyController');
const historyController = require('../controller/historyController');

// dataController 
router.get('/data', dataController.getData);
router.post('/data', dataController.createData);

// moneyController
router.post('/calculateCost', moneyController.calculateCost); // New route for cost calculation

// historyController
router.get('/history', historyController.getHistory);
router.get('/history/:id', historyController.getHistoryById);
router.post('/history', historyController.createHistory);
router.put('/history/:id', historyController.updateHistory);
router.delete('/history/:id', historyController.deleteHistory);


module.exports = router;
