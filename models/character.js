module.exports = function (sequelize, DataTypes) {
    const Character = sequelize.define('character', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Character;
}