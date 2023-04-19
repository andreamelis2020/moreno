const db = require("../models");
const Permesso = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Permesso
exports.create = (req, res) => {

    // Create a Permesso
    const role = {
        id: req.body.id,
        name: req.body.name,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
    };

    // Save Permesso in the database
    Permesso.create(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Permesso."
            });
        });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    Permesso.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Permesso with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Permesso.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Permesso with id=" + id
            });
        });
};

// Find a single Permesso with an role
exports.findOneComune = (req, res) => {
    const role = req.params.role;

    Permesso.findByPk(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Permesso with role=" + role
            });
        });
};

// Update a Permesso by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Permesso.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Permesso was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Permesso with id=${id}. Maybe Permesso was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Permesso with id=" + id
            });
        });
};

// Delete a Permesso with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Permesso.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Permesso was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Permesso with id=${id}. Maybe Permesso was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Permesso with id=" + id
            });
        });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    Permesso.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} prova News were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all licenze."
            });
        });
};

// Find all Permesso with an provincia
exports.findAllProvincia = (req, res) => {
    const provincia = req.params.provincia;

    Permesso.findAll({ where: { provincia: provincia } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Permesso with provincia=" + provincia
            });
        });
};

// Find all Permesso with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Permesso.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Permesso with campo_generale_4=" + campo_generale_4
            });
        });
};


// find all published Permesso
exports.findAllPublished = (req, res) => {
    Permesso.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving licenze."
            });
        });
};