const { DataTypes, STRING } = require('sequelize');
const {sequelize,connectdb} = require('../Config/db');
const User = require('./User');

const Document = sequelize.define('Document', {
  document_name:{
    type:STRING
  },
  document_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  document_hash: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  issuer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  receiver_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'transacted', 'completed'), // Alternatively, use DataTypes.ENUM('pending', 'transacted', 'completed') if you have fixed statuses
    allowNull: false,
    defaultValue: 'pending' // Default status can be set to 'pending'
  },
  storage_uri: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = Document;