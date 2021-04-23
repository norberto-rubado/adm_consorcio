module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING
        },
        answer: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'questions_answers',
        timestamps: false
    };
            
    let questions_answers = sequelize.define('questions_answers', cols, config);

    return questions_answers;
}