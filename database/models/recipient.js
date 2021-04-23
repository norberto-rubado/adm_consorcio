module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        
        address_id: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'recipients',
        timestamps: false
    };

    let recipients = sequelize.define('recipients', cols, config);

    recipients.associate = function(models) {
        
        recipients.belongsToMany(models.purchases, {
            as: 'purchases',
            through: 'recipient_purchase',
            foreignKey:'recipent_id' ,
            otherKey: 'purchase_id',
            timestamps: false
        })
    }

    return recipients;
}