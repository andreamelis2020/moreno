module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define("partners", {
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
        tableName: 'partners'
    });

    // Association to other models (foreign keys)
    Partner.associate = function(models) {

    };

    return Partner;
};