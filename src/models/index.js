const sequelize = require('../config/database');

const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Image = require('./Image');
const Option = require('./Option');

// Uma categoria possui vários produtos
Category.hasMany(Product, {
  foreignKey: 'categoriaId',
  as: 'produtos'
});

Product.belongsTo(Category, {
  foreignKey: 'categoriaId',
  as: 'categoria'
});

// Um produto possui várias imagens
Product.hasMany(Image, {
  foreignKey: 'produtoId',
  as: 'imagens'
});

Image.belongsTo(Product, {
  foreignKey: 'produtoId',
  as: 'produto'
});

// Um produto possui várias opções
Product.hasMany(Option, {
  foreignKey: 'produtoId',
  as: 'opcoes'
});

Option.belongsTo(Product, {
  foreignKey: 'produtoId',
  as: 'produto'
});

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Image,
  Option
};