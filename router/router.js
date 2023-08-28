const express = require('express');
const router = express.Router();
const apiController = require('../controller/dataController');
const dataController = require('../controller/dataController');

// Define routes
router.get('/data', dataController.getData);
router.post('/data', dataController.createData);

module.exports = router;
