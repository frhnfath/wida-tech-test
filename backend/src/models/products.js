'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.hasMany(models.Invoice_has_product, {foreignKey: 'product_id'});
    }
  }
  Products.init({
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { 
      type: DataTypes.STRING
    },
    price: DataTypes.DECIMAL,
    deleted_at: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    quantity: DataTypes.INTEGER
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Products',
  });
  return Products;
};