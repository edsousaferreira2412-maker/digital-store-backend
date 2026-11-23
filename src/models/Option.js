const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Option = sequelize.define('Option', {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  valor: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'options'
});

module.exports = Option;