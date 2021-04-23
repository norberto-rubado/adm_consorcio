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
        password: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        image: {
            type: DataTypes.STRING
        },
        last_login: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        last_date_password: {
            type: DataTypes.DATE
        },
        language: {
            type: DataTypes.STRING,
            defaultValue: 'esp'
        },
        country: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        brday: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        residence: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        phone: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        dark_mode: {
            type: DataTypes.STRING,
            defaultValue: 'n'
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'active'
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    let users = sequelize.define('users', cols, config);

    users.associate = function (models) {
        users.hasMany(models.comments, {
            as: 'comments',
            foreignKey: 'user_id'
        });
        users.hasMany(models.purchases, {
            as: 'purchases',
            foreignKey: 'user_id'
        });
        users.hasMany(models.carts, {
            as: 'carts',
            foreignKey: 'user_id'
        })
    }

    return users;
}