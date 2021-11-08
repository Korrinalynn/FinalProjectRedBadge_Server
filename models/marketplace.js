module.exports = function (sequelize, DataTypes) {
    const Marketplace = sequelize.define('marketplace', {
        icon: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Marketplace;
}

//needs a filter in order to work in the API
// ex. https://xivapi.com/search?filters=LevelItem>1,LevelItem<=50,ClassJobCategory.ID=38