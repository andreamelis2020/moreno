const db = require("../models");
const Partner = db.partners;
const Op = db.Sequelize.Op;

// Create and Save a new Partner
exports.create = (req, res) => {

    // Create a Partner
    const contratto = {
        nome: req.body.nome
    };

    // Save Partner in the database
    Partner.create(contratto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Partner."
            });
        });
};

// Retrieve all PArtner from the database.
exports.findAll = (req, res) => {
    Partner.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Partner with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Partner.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Partner with id=" + id
            });
        });
};

// Find a single Partner with an contratto
exports.findOneComune = (req, res) => {
    const contratto = req.params.contratto;

    Partner.findByPk(contratto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Partner with contratto=" + contratto
            });
        });
};

// Update a Partner by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Partner.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Partner was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Partner with id=${id}. Maybe Partner was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Partner with id=" + id
            });
        });
};

// Delete a Partner with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Partner.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Partner was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Partner with id=${id}. Maybe Partner was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Partner with id=" + id
            });
        });
};

// Delete all Patrners from the database.
exports.deleteAll = (req, res) => {
    Partner.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} prova Patrners were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all partners."
            });
        });
};

// Find all Partner with an provincia
exports.findAllProvincia = (req, res) => {
    const provincia = req.params.provincia;

    Partner.findAll({ where: { provincia: provincia } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Partner with provincia=" + provincia
            });
        });
};

// Find all Partner with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Partner.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Partner with campo_generale_4=" + campo_generale_4
            });
        });
};


// find all published Partner
exports.findAllPublished = (req, res) => {
    Partner.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving partners."
            });
        });
};