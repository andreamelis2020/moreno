module.exports = (sequelize, Sequelize) => {
    const Comune = sequelize.define("comuni", {
        area_intervento: {
            type: Sequelize.STRING
        },
        comune: {
            type: Sequelize.STRING
        },
        abitanti: {
            type: Sequelize.INTEGER
        },
        n_sedi: {
            type: Sequelize.INTEGER
        },
        fascia: {
            type: Sequelize.STRING
        },
        stato_doc_progetto: {
            type: Sequelize.STRING
        },
        data_pres_progetto: {
            type: Sequelize.STRING
        },
        stato_attivazione: {
            type: Sequelize.STRING
        },
        data_attivazione: {
            type: Sequelize.STRING
        },
        rif: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        },
        disp_pdf: {
            type: Sequelize.INTEGER
        },
        disp_pdf_string: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'comuni'
    });

    // Association to other models (foreign keys)
    Comune.associate = function(models) {

    };

    return Comune;
};