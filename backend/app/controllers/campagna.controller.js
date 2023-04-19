const db = require("../models");
const Campagna = db.campagne;
const Op = db.Sequelize.Op;

// Create and Save a new Campagna
exports.create = (req, res) => {

    // Create a Campagna
    const campagna = {
        nome: req.body.nome
    };

    // Save Campagna in the database
    Campagna.create(campagna)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Campagna."
            });
        });
};

// Retrieve all Campagne from the database.
exports.findAll = (req, res) => {
    Campagna.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Campagna with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Campagna.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Campagna with id=" + id
            });
        });
};

// Find a single Campagna with an campagna
exports.findOneComune = (req, res) => {
    const campagna = req.params.campagna;

    Campagna.findByPk(campagna)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Campagna with campagna=" + campagna
            });
        });
};

// Update a Campagna by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Campagna.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Campagna was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Campagna with id=${id}. Maybe Campagna was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Campagna with id=" + id
            });
        });
};

// Delete a Campagna with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Campagna.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Campagna was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Campagna with id=${id}. Maybe Campagna was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Campagna with id=" + id
            });
        });
};

// Delete all Patrners from the database.
exports.deleteAll = (req, res) => {
    Campagna.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} prova Patrners were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all campagne."
            });
        });
};

// Find all Campagna with an provincia
exports.findAllProvincia = (req, res) => {
    const provincia = req.params.provincia;

    Campagna.findAll({ where: { provincia: provincia } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Campagna with provincia=" + provincia
            });
        });
};

// Find all Campagna with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Campagna.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Campagna with campo_generale_4=" + campo_generale_4
            });
        });
};


// find all published Campagna
exports.findAllPublished = (req, res) => {
    Campagna.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving campagne."
            });
        });
};