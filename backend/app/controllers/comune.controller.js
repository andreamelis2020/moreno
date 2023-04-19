const db = require("../models");
const Comune = db.comuni;
const Op = db.Sequelize.Op;

// Create and Save a new Comune
exports.create = (req, res) => {

    // Create a Comune
    const comune = {
        area_intervento: req.body.area_intervento,
        comune: req.body.comune,
        abitanti: req.body.abitanti,
        n_sedi: req.body.n_sedi,
        fascia: req.body.fascia,
        stato_doc_progetto: req.body.stato_doc_progetto,
        data_pres_progetto: req.body.data_pres_progetto,
        stato_attivazione: req.body.stato_attivazione,
        data_attivazione: req.body.data_attivazione,
        data_presentazione: req.body.data_presentazione,
        rif: req.body.rif,
        note: req.body.note,
        disp_pdf: req.body.disp_pdf,
        disp_pdf_string: req.body.disp_pdf_string
    };

    // Save Comune in the database
    Comune.create(comune)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Comune."
            });
        });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    Comune.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Comune with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comune.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comune with id=" + id
            });
        });
};

// Find a single Comune with an comune
exports.findOneComune = (req, res) => {
    const comune = req.params.comune;

    Comune.findByPk(comune)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comune with comune=" + comune
            });
        });
};

// Update a Comune by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Comune.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comune was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Comune with id=${id}. Maybe Comune was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comune with id=" + id
            });
        });
};

// Delete a Comune with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Comune.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comune was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comune with id=${id}. Maybe Comune was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comune with id=" + id
            });
        });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    Comune.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} prova News were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all comuni."
            });
        });
};

// Find all Comune with an provincia
exports.findAllProvincia = (req, res) => {
    const provincia = req.params.provincia;

    Comune.findAll({ where: { provincia: provincia } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comune with provincia=" + provincia
            });
        });
};

// Find all Comune with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Comune.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comune with campo_generale_4=" + campo_generale_4
            });
        });
};


// find all published Comune
exports.findAllPublished = (req, res) => {
    Comune.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comuni."
            });
        });
};