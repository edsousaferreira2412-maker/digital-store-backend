const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
  caminho: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'images'
});

module.exports = Image;