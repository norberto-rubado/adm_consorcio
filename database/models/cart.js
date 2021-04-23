const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_number: {
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: moment(new Date()).format('YYYY-MM-DD')
    },
    updated_at: {
      type: DataTypes.DATE
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  };

  let config = {
    tableName: 'carts',
    timestamps: false
  };

  let carts = sequelize.define('carts', cols, config);

  carts.associate = function (models) {
    carts.hasMany(models.items, {
      as: 'items',
      foreignKey: 'cart_id'
    });

    carts.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'user_id'
    });
  }

  return carts;
}