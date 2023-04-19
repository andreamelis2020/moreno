module.exports = (sequelize, Sequelize) => {
    const Campagna = sequelize.define("campagne", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'campagne'
    });

    // Association to other models (foreign keys)
    Campagna.associate = function(models) {

    };

    return Campagna;
};