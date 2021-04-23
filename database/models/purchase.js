module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        purchase_date: {
            type: DataTypes.DATE
        },
        total: {
            type: DataTypes.DECIMAL
        },
        
        status_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'purchases',
        timestamps: false
    };

    let purchases = sequelize.define('purchases', cols, config);

    purchases.associate = function(models) {
        purchases.belongsTo(models.users, {
            as: 'users',
            foreignKey: 'user_id'
        });
        purchases.hasOne(models.statuses, {
            as: 'statuses',
            foreignKey: 'status_id'
        });
        purchases.belongsToMany(models.products, {
            as: 'products',
            through: 'purchase_product',
            foreignKey: 'purchase_id',
            otherKey: 'product_id',
            timestamps: false
        });
        purchases.belongsToMany(models.recipients, {
            as: 'recipients',
            through: 'recipient_purchase',
            foreignKey: 'purchase_id',
            otherKey: 'recipent_id',
            timestamps: false
        })
    }

    return purchases;
}