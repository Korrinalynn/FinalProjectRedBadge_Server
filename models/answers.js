module.exports = function (sequelize, DataTypes) {
    const Answers = sequelize.define('answers', {
        answer: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        characterId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Answers;
}