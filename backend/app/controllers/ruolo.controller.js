const db = require("../models");
const Ruolo = db.ruolo;
const Op = db.Sequelize.Op;

// Create and Save a new Ruolo
exports.create = (req, res) => {

    // Create a Ruolo
    const ruolo = {
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        roleId: req.body.roleId,
        userId: req.body.userId,
    };

    // Save Ruolo in the database
    Ruolo.create(ruolo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione del Ruolo."
            });
        });
};

// Retrieve all Ruoli from the database.
exports.findAll = (req, res) => {
    Ruolo.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Find a single Ruolo with an id
exports.findOne = (req, res) => {
    const userId = req.params.userId;

    Ruolo.findByPk(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ruolo with id=" + userId
            });
        });
};

// Find a single Ruolo with an ruolo
exports.findOneComune = (req, res) => {
    const id = req.params.id;

    Ruolo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ruolo with ruolo=" + id
            });
        });
};

// Find all Ruolo with an userId
exports.findAllProvincia = (req, res) => {
    const userId = req.params.userId;

    Ruolo.findOne({ where: { userId: userId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ruolo with provincia=" + userId
            });
        });
};

// Update a Ruolo by the id in the request
exports.update = (req, res) => {
    const entryId = req.params.userId;
    const {
        userId,
        roleId
    } = req.body;

    Ruolo.findOne({
            where: {
                userId: entryId,
            }
        })
        .then(entry => {
            if (!entry) {
                return res.status(404).send({
                    error: true,
                    message: 'Cannot update a entry that does not exist.',
                    entryId
                })
            }

            Ruolo.update({
                    userId: entryId,
                    roleId: roleId
                }, {
                    where: {
                        userId: entryId
                    }
                })
                .then(updated => {
                    if (updated.pop() === 1) {
                        console.log("entryId: ", entryId)

                        return res.status(201).send({
                            updated: true,
                            entryId
                        });
                    } else {
                        return res.status(400).send({
                            updated: false,
                            entryId
                        })
                    }
                })
                .catch(error => {
                    return res.status(500).send(error);
                });
        })
        .catch(error => {
            return res.status(500).send(error);
        })
};

// Delete a Ruolo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Ruolo.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ruolo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ruolo with id=${id}. Maybe Ruolo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ruolo with id=" + id
            });
        });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    Ruolo.destroy({
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



// Find all Ruolo with an provincia
exports.findAllStato = (req, res) => {
    const campo_generale_4 = req.params.campo_generale_4;

    Ruolo.findAll({ where: { campo_generale_4: campo_generale_4 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ruolo with campo_generale_4=" + campo_generale_4
            });
        });
};

// find all published Ruolo
exports.findAllPublished = (req, res) => {
    Ruolo.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving licenze."
            });
        });
};