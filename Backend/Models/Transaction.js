const { DataTypes } = require('sequelize');
const {sequelize,connectdb} = require('../Config/db');
const Document = require('./Document');

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  document_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Document,
      key: 'document_id'
    }
  },
  composite_hash: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  signed_hash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  blockchain_tx_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
});

module.exports = Transaction;
