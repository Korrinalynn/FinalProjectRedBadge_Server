module.exports = function (sequelize, DataTypes) {
    const Character = sequelize.define('character', {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        characterName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        bio: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    return Character;
}