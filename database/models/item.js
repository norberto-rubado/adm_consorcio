module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sale_price: {
      type: DataTypes.DECIMAL
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    subtotal: {
      type: DataTypes.INTEGER
    },
    state: {
      type: DataTypes.TINYINT
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    seller_id: {
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER
    },
    cart_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null
    }
  };

  let config = {
    tableName: 'items',
    timestamps: false
  };

  let items = sequelize.define('items', cols, config);

  items.closeItems = function (user_id) {
    return sequelize.query(
      `UPDATE items SET state = 0 WHERE user_id = ${user_id} AND state = 1`
    );
  };

  items.assignItems = function (user_id, cart_id) {
    return sequelize.query(
      `UPDATE items SET cart_id = ${cart_id} WHERE user_id = ${user_id} AND cart_id IS NULL`
    );
  };

  items.associate = function (models) {
    items.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'user_id'
    });

    items.belongsTo(models.carts, {
      as: 'carts',
      foreignKey: 'cart_id'
    });

    items.belongsTo(models.products, {
      as: 'products',
      foreignKey: 'product_id'
    });
  }

  return items;
}