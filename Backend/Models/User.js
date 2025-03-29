const { DataTypes } = require('sequelize');
const {sequelize,connectdb} = require('../Config/db');

const User = sequelize.define('User', {
  username:{
    type:DataTypes.STRING,
    allowNull:false
  },
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('issuer', 'receiver', 'verifier'),
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  public_key: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = User;
