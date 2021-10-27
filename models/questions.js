module.exports = function (sequelize, DataTypes) {
    const Questions = sequelize.define('questions', {
        question: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        characterId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Questions;
}