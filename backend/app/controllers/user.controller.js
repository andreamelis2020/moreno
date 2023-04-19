const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.pmBoard = (req, res) => {
    res.status(200).send("Pm Content.");
};

exports.developerBoard = (req, res) => {
    res.status(200).send("Developer Content.");
};

exports.bossBoard = (req, res) => {
    res.status(200).send("Boss Content.");
};

exports.modOrAdminBoard = (req, res) => {
    res.status(200).send("Mod or Admin Content.");
};

exports.bossOrDeveloperBoard = (req, res) => {
    res.status(200).send("Boss or Developer Content.");
};

exports.bossOrDeveloperOrAdminBoard = (req, res) => {
    res.status(200).send("Boss or Developer or Admin Content.");
};

exports.bossOrPmBoard = (req, res) => {
    res.status(200).send("Boss or Pm Content.");
};

exports.bossOrAdminBoard = (req, res) => {
    res.status(200).send("Boss or Admin Content.");
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    User.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving news."
            });
        });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Account was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Account with id=" + id
            });
        });
};