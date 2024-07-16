'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.prototype.CorrectPassword = async(reqPass, passDB) => {
    return await bcrypt.compareSync(reqPass, passDB);
  }
  User.init({
    id : {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    timestamps : true,
    hooks: {
      beforeCreate: async(user) => {
        // ecnryption
        if (user.password) {
          const encr = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, encr)
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};