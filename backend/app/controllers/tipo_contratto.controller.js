const db = require("../models");
const Tipo_contratto = db.tipi_contratto;
const Op = db.Sequelize.Op;

// Create and Save a new Tipo_contratto
exports.create = (req, res) => {

    // Create a Tipo_contratto
    const tipo_contratto = {
        nome: req.body.nome
    };

    // Save Tipo_contratto in the database
    Tipo_contratto.create(tipo_contratto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Tipo_contratto."
            });
        });
};

// Retrieve all Tipo_contratto from the database.
exports.findAll = (req, res) => {
    Tipo_contratto.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Tipo_contratto with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tipo_contratto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_contratto with id=" + id
            });
        });
};

// Find a single Tipo_contratto with an tipo_contratto
exports.findOneComune = (req, res) => {
    const tipo_contratto = req.params.tipo_contratto;

    Tipo_contratto.findByPk(tipo_contratto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_contratto with tipo_contratto=" + tipo_contratto
            });
        });
};

// Update a Tipo_contratto by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tipo_contratto.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tipo_contratto was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tipo_contratto with id=${id}. Maybe Tipo_contratto was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tipo_contratto with id=" + id
            });
        });
};

// Delete a Tipo_contratto with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tipo_contratto.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tipo_contratto was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tipo_contratto with id=${id}. Maybe Tipo_contratto was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tipo_contratto with id=" + id
            });
        });
};

// Delete all Patrners from the database.
exports.deleteAll = (req, res) => {
    Tipo_contratto.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} prova Patrners were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tipi_contratto."
            });
        });
};

// Find all Tipo_contratto with an provincia
exports.findAllProvincia = (req, res) => {
    const provincia = req.params.provincia;

    Tipo_contratto.findAll({ where: { provincia: provincia } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_contratto with provincia=" + provincia
            });
        });
};

// Find all Tipo_contratto with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Tipo_contratto.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_contratto with campo_generale_4=" + campo_generale_4
            });
        });
};


// find all published Tipo_contratto
exports.findAllPublished = (req, res) => {
    Tipo_contratto.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tipi_contratto."
            });
        });
};