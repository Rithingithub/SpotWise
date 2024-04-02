const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');  

const History = sequelize.define('History', {
    timestamp: {
        type: DataTypes.DATE,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    payAmount: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = History;
