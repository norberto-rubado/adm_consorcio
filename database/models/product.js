module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        supplier_id: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        expiration_days: {
            type: DataTypes.INTEGER
        },
        share: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        discount: {
            type: DataTypes.DECIMAL
        },
        life_date_from: {
            type: DataTypes.DATE
        },
        life_date_to: {
            type: DataTypes.DATE
        },
        stock: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'products',
        timestamps: false
    };

    let products = sequelize.define('products', cols, config);

    products.associate = function (models) {
        products.hasMany(models.comments, {
            as: 'comments',
            foreignKey: 'product_id'
        });

        products.belongsTo(models.suppliers, {
            as: 'suppliers',
            foreignKey: 'supplier_id'
        });

        products.hasMany(models.product_image, {
            as: 'product_image',
            foreignKey: 'product_id'
        });

        products.belongsTo(models.categories, {
            as: 'categories',
            foreignKey: 'category_id'
        });

        products.belongsToMany(models.purchases, {
            as: 'purchases',
            through: 'purchase_product',
            foreignKey: 'product_id',
            otherKey: 'purchase_id',
            timestamps: false
        });

        products.belongsTo(models.users, {
            as: 'users',
            foreignKey: 'user_id'
        });

        products.hasMany(models.items, {
            as: 'items',
            foreignKey: 'product_id'
        });


    }

    return products;
}