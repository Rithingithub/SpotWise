const MoneyModel = require('../model/moneyModel');

class DataController {
  getData(req, res) {
    // Implement your logic to get data
  }

  createData(req, res) {
    // Implement your logic to create data
  }

  calculateCost(req, res) {
    const { time } = req.body;

    if (!time || typeof time !== 'number') {
      return res.status(400).json({ error: 'Invalid input. Please provide a valid numeric time value.' });
    }

    const moneyModel = new MoneyModel();
    const cost = moneyModel.calculateMoney(time);

    return res.json({ cost });
  }
}

module.exports = new DataController();
