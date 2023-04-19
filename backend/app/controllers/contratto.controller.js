const db = require("../models");
const Contratto = db.contratti;
const Op = db.Sequelize.Op;

// Create and Save a new Contratto
exports.create = (req, res) => {

    // Create a Contratto
    const contratto = {
        partner: req.body.partner,
        campagna: req.body.campagna,
        tipo_offerta: req.body.tipo_offerta,
        tipo_contratto: req.body.tipo_contratto,
        lista: req.body.lista,
        nome_intestatario: req.body.nome_intestatario,
        cognome_intestatario: req.body.cognome_intestatario,
        data_nascita_intestatario: req.body.data_nascita_intestatario,
        luogo_nascita_intestatario: req.body.luogo_nascita_intestatario,
        tipo_documento_intestatario: req.body.tipo_documento_intestatario,
        ente_rilascio_intestatario: req.body.ente_rilascio_intestatario,
        numero_doc_intestatario: req.body.numero_doc_intestatario,
        data_rilascio_doc_intestatario: req.body.data_rilascio_doc_intestatario,
        data_scadenza_doc: req.body.data_scadenza_doc,
        codice_fiscale_intestatario: req.body.codice_fiscale_intestatario,
        telefono_1_intestatario: req.body.telefono_1_intestatario,
        telefono_2_intestatario: req.body.telefono_2_intestatario,
        email_intestatario: req.body.email_intestatario,
        indirizzo_residenza: req.body.indirizzo_residenza,
        num_residenza: req.body.num_residenza,
        comune_residenza: req.body.comune_residenza,
        prov_residenza: req.body.prov_residenza,
        cap_residenza: req.body.cap_residenza,
        indirizzo_fornitura: req.body.indirizzo_fornitura,
        num_fornitura: req.body.num_fornitura,
        comune_fornitura: req.body.comune_fornitura,
        prov_fornitura: req.body.prov_fornitura,
        cap_fornitura: req.body.cap_fornitura,
        indirizzo_fatturazione: req.body.indirizzo_fatturazione,
        comune_fatturazione: req.body.comune_fatturazione,
        prov_fatturazione: req.body.prov_fatturazione,
        cap_fatturazione: req.body.cap_fatturazione,
        titolarita_immobile: req.body.titolarita_immobile,
        fascia_reperibilita: req.body.fascia_reperibilita,
        tipo_fatturazione: req.body.tipo_fatturazione,
        mod_pagamento: req.body.mod_pagamento,
        ente_pagamento: req.body.ente_pagamento,
        nome_delega_pagamento: req.body.nome_delega_pagamento,
        cognome_delega_pagamento: req.body.cognome_delega_pagamento,
        codice_fiscale_delega_pagamento: req.body.codice_fiscale_delega_pagamento,
        note_operatore: req.body.note_operatore,
        note_supervisor: req.body.note_supervisor,
        note_bo: req.body.note_bo,
        nome_file_1: req.body.nome_file_1,
        nome_file_2: req.body.nome_file_2,
        nome_file_3: req.body.nome_file_3,
        nome_file_4: req.body.nome_file_4,
        nome_file_5: req.body.nome_file_5,
        nome_file_6: req.body.nome_file_6,
        nome_file_7: req.body.nome_file_7,
        nome_file_8: req.body.nome_file_8,
        nome_file_9: req.body.nome_file_9,
        nome_file_10: req.body.nome_file_10,
        nome_file_11: req.body.nome_file_11
    };

    // Save Contratto in the database
    Contratto.create(contratto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Contratto."
            });
        });
};

// Retrieve all Contratti from the database.
exports.findAll = (req, res) => {
    Contratto.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Contratto with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contratto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Contratto with id=" + id
            });
        });
};

// Find a single Contratto with an contratto
exports.findOneComune = (req, res) => {
    const contratto = req.params.contratto;

    Contratto.findByPk(contratto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Contratto with contratto=" + contratto
            });
        });
};

// Update a Contratto by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Contratto.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contratto was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Contratto with id=${id}. Maybe Contratto was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Contratto with id=" + id
            });
        });
};

// Delete a Contratto with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Contratto.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contratto was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Contratto with id=${id}. Maybe Contratto was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contratto with id=" + id
            });
        });
};

// Delete all Contratti from the database.
exports.deleteAll = (req, res) => {
    Contratto.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} prova Contratti were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all contratti."
            });
        });
};

// Find all Contratto with an provincia
exports.findAllProvincia = (req, res) => {
    const provincia = req.params.provincia;

    Contratto.findAll({ where: { provincia: provincia } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Contratto with provincia=" + provincia
            });
        });
};

// Find all Contratto with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Contratto.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Contratto with campo_generale_4=" + campo_generale_4
            });
        });
};


// find all published Contratto
exports.findAllPublished = (req, res) => {
    Contratto.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving contratti."
            });
        });
};