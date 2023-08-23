const dataModel = {
    // In-memory data store (replace this with a database in a real application)
    data: [],
    
    getData: () => {
      return dataModel.data;
    },
    
    createData: (newData) => {
      dataModel.data.push(newData);
      return newData;
    }
  };
  
  module.exports = dataModel;
  