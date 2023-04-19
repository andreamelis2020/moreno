const db = require("../models");
const Tipo_offerta = db.tipi_offerta;
const Op = db.Sequelize.Op;

// Create and Save a new Tipo_offerta
exports.create = (req, res) => {

    // Create a Tipo_offerta
    const tipo_offerta = {
        nome: req.body.nome
    };

    // Save Tipo_offerta in the database
    Tipo_offerta.create(tipo_offerta)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Tipo_offerta."
            });
        });
};

// Retrieve all Tipi_offerta from the database.
exports.findAll = (req, res) => {
    Tipo_offerta.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Tipo_offerta with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tipo_offerta.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_offerta with id=" + id
            });
        });
};

// Find a single Tipo_offerta with an tipo_offerta
exports.findOneComune = (req, res) => {
    const tipo_offerta = req.params.tipo_offerta;

    Tipo_offerta.findByPk(tipo_offerta)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_offerta with tipo_offerta=" + tipo_offerta
            });
        });
};

// Update a Tipo_offerta by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tipo_offerta.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tipo_offerta was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tipo_offerta with id=${id}. Maybe Tipo_offerta was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tipo_offerta with id=" + id
            });
        });
};

// Delete a Tipo_offerta with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tipo_offerta.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tipo_offerta was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tipo_offerta with id=${id}. Maybe Tipo_offerta was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tipo_offerta with id=" + id
            });
        });
};

// Delete all Patrners from the database.
exports.deleteAll = (req, res) => {
    Tipo_offerta.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} prova Patrners were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tipi_offerta."
            });
        });
};

// Find all Tipo_offerta with an provincia
exports.findAllProvincia = (req, res) => {
    const provincia = req.params.provincia;

    Tipo_offerta.findAll({ where: { provincia: provincia } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_offerta with provincia=" + provincia
            });
        });
};

// Find all Tipo_offerta with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Tipo_offerta.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tipo_offerta with campo_generale_4=" + campo_generale_4
            });
        });
};


// find all published Tipo_offerta
exports.findAllPublished = (req, res) => {
    Tipo_offerta.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tipi_offerta."
            });
        });
};