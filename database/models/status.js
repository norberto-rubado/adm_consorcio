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
        name: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'statuses',
        timestamps: false
    };

    let statuses = sequelize.define('statuses', cols, config);

    statuses.associate = function(models) {
        statuses.belongsTo(models.purchases, {
            as: 'purchases',
            foreignKey: 'status_id'
        })
    }
    return statuses
}