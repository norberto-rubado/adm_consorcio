module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
            type: DataTypes.STRING
        },
        purchase_id: {
            type: DataTypes.INTEGER
        },
        recipient_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'recipient_purchase',
        timestamps: false
    };

    let recipient_purchase = sequelize.define('recipient_purchase', cols, config);
    return recipient_purchase;
}