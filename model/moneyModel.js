// // models/moneyModel.js
// class MoneyModel {
//     calculateMoney(time) {
//       if (time === 1) {
//         return 30;
//       } else if (time === 1.5) {
//         return 45;
//       } else {
//         // You can add more cases for different time values
//         return 0; // Default case, or you can handle it differently
//       }
//     }
//   }
  
//   module.exports = MoneyModel;
  

class MoneyModel {
    calculateMoney(time) {
      // Assuming the rate is 30 rupees per hour
      const ratePerHour = 30;
  
      // Calculate the payment based on the time provided
      const payment = ratePerHour * time;
  
      // Round to two decimal places
      return Math.round(payment * 100) / 100;
    }
  }
  
  module.exports = MoneyModel;
  