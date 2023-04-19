module.exports = (sequelize, Sequelize) => {
    const Tipo_contratto = sequelize.define("tipi_contratto", {
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
        tableName: 'tipi_contratto'
    });

    // Association to other models (foreign keys)
    Tipo_contratto.associate = function(models) {

    };

    return Tipo_contratto;
};