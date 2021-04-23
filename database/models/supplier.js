module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'suppliers',
        timestamps: false
    };

    // suppliers.associate = function(models) {
    //     suppliers.hasMany(models.products, {
    //         as: "proveedores",
    //         foreignKey: "supplier_id"
    //     })
    // }

    let suppliers = sequelize.define('suppliers', cols, config);

    suppliers.associate = function(models) {
        suppliers.hasMany(models.products, {
            as: 'products',
            foreignKey: 'supplier_id'
        });
    }

    return suppliers
}