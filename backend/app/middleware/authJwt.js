const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

trovaTutto = (req, res) => {
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


isPm = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "pm") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Pm Role!"
            });
            return;
        });
    });
};

isDeveloper = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "developer") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Developer Role!"
            });
            return;
        });
    });
};

isBoss = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "boss") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Boss Role!"
            });
            return;
        });
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }

            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

isBossOrDeveloper = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "boss") {
                    next();
                    return;
                }

                if (roles[i].name === "developer") {
                    next();
                    return;
                }

            }

            res.status(403).send({
                message: "Require Developer or Boss Role!"
            });
        });
    });
};

isBossOrDeveloperOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "boss") {
                    next();
                    return;
                }

                if (roles[i].name === "developer") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }

            }

            res.status(403).send({
                message: "Require Developer or Boss or Admin Role!"
            });
        });
    });
};

isBossOrPm = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "boss") {
                    next();
                    return;
                }

                if (roles[i].name === "pm") {
                    next();
                    return;
                }

            }

            res.status(403).send({
                message: "Require Boss or Pm Role!"
            });
        });
    });
};

isBossOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "boss") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }

            }

            res.status(403).send({
                message: "Require Boss or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isPm: isPm,
    isDeveloper: isDeveloper,
    isBoss: isBoss,
    isModeratorOrAdmin: isModeratorOrAdmin,
    isBossOrDeveloper: isBossOrDeveloper,
    isBossOrDeveloperOrAdmin: isBossOrDeveloperOrAdmin,
    isBossOrPm: isBossOrPm,
    isBossOrAdmin: isBossOrAdmin,
    trovaTutto: trovaTutto
};
module.exports = authJwt;