module.exports = (sequelize, Sequelize) => {
    const Tipo_offerta = sequelize.define("tipi_offerta", {
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
        tableName: 'tipi_offerta'
    });

    // Association to other models (foreign keys)
    Tipo_offerta.associate = function(models) {

    };

    return Tipo_offerta;
};