module.exports = (sequelize, Sequelize) => {
    const Contratto = sequelize.define("contratti", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        partner: {
            type: Sequelize.STRING
        },
        campagna: {
            type: Sequelize.STRING
        },
        tipo_offerta: {
            type: Sequelize.STRING
        },
        tipo_contratto: {
            type: Sequelize.STRING
        },
        lista: {
            type: Sequelize.STRING
        },
        nome_intestatario: {
            type: Sequelize.STRING
        },
        cognome_intestatario: {
            type: Sequelize.STRING
        },
        data_nascita_intestatario: {
            type: Sequelize.STRING
        },
        luogo_nascita_intestatario: {
            type: Sequelize.STRING
        },
        tipo_documento_intestatario: {
            type: Sequelize.STRING
        },
        ente_rilascio_intestatario: {
            type: Sequelize.STRING
        },
        numero_doc_intestatario: {
            type: Sequelize.STRING
        },
        data_rilascio_doc_intestatario: {
            type: Sequelize.STRING
        },
        data_scadenza_doc: {
            type: Sequelize.STRING
        },
        codice_fiscale_intestatario: {
            type: Sequelize.STRING
        },
        telefono_1_intestatario: {
            type: Sequelize.STRING
        },
        telefono_2_intestatario: {
            type: Sequelize.STRING
        },
        email_intestatario: {
            type: Sequelize.STRING
        },
        indirizzo_residenza: {
            type: Sequelize.STRING
        },
        num_residenza: {
            type: Sequelize.STRING
        },
        comune_residenza: {
            type: Sequelize.STRING
        },
        prov_residenza: {
            type: Sequelize.STRING
        },
        cap_residenza: {
            type: Sequelize.STRING
        },
        indirizzo_fornitura: {
            type: Sequelize.STRING
        },
        num_fornitura: {
            type: Sequelize.STRING
        },
        comune_fornitura: {
            type: Sequelize.STRING
        },
        prov_fornitura: {
            type: Sequelize.STRING
        },
        cap_fornitura: {
            type: Sequelize.STRING
        },
        indirizzo_fatturazione: {
            type: Sequelize.STRING
        },
        num_fatturazione: {
            type: Sequelize.STRING
        },
        comune_fatturazione: {
            type: Sequelize.STRING
        },
        prov_fatturazione: {
            type: Sequelize.STRING
        },
        cap_fatturazione: {
            type: Sequelize.STRING
        },
        titolarita_immobile: {
            type: Sequelize.STRING
        },
        fascia_reperibilita: {
            type: Sequelize.STRING
        },
        tipo_fatturazione: {
            type: Sequelize.STRING
        },
        mod_pagamento: {
            type: Sequelize.STRING
        },
        ente_pagamento: {
            type: Sequelize.STRING
        },
        nome_delega_pagamento: {
            type: Sequelize.STRING
        },
        cognome_delega_pagamento: {
            type: Sequelize.STRING
        },
        codice_fiscale_delega_pagamento: {
            type: Sequelize.STRING
        },
        note_operatore: {
            type: Sequelize.STRING
        },
        note_supervisor: {
            type: Sequelize.STRING
        },
        note_bo: {
            type: Sequelize.STRING
        },
        nome_file_1: {
            type: Sequelize.TEXT
        },
        nome_file_2: {
            type: Sequelize.TEXT
        },
        nome_file_3: {
            type: Sequelize.TEXT
        },
        nome_file_4: {
            type: Sequelize.TEXT
        },
        nome_file_5: {
            type: Sequelize.TEXT
        },
        nome_file_6: {
            type: Sequelize.TEXT
        },
        nome_file_7: {
            type: Sequelize.TEXT
        },
        nome_file_8: {
            type: Sequelize.TEXT
        },
        nome_file_9: {
            type: Sequelize.TEXT
        },
        nome_file_10: {
            type: Sequelize.TEXT
        },
        nome_file_11: {
            type: Sequelize.TEXT
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'contratti'
    });

    // Association to other models (foreign keys)
    Contratto.associate = function(models) {

    };

    return Contratto;
};