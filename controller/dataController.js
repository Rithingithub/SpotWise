const dataModel = require('../model/dataModel');

const dataController = {
  getData: (req, res) => {
    // Implement logic to get data from the model
    const data = dataModel.getData();
    res.json(data);
  },
  
  createData: (req, res) => {
    // Implement logic to create data using the model
    const newData = req.body;
    const createdData = dataModel.createData(newData);
    res.json(createdData);
  }
};

module.exports = dataController;
