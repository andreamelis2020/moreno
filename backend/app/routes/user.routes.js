const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user", [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/mod", [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/test/pm", [authJwt.verifyToken, authJwt.isPm],
        controller.pmBoard
    );

    app.get(
        "/api/test/developer", [authJwt.verifyToken, authJwt.isDeveloper],
        controller.developerBoard
    );

    app.get(
        "/api/test/boss", [authJwt.verifyToken, authJwt.isBoss],
        controller.bossBoard
    );

    app.get(
        "/api/test/modOrAdmin", [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.modOrAdminBoard
    );

    app.get(
        "/api/test/bossOrDeveloper", [authJwt.verifyToken, authJwt.isBossOrDeveloper],
        controller.bossOrDeveloperBoard
    );

    app.get(
        "/api/test/bossOrDeveloperOrAdmin", [authJwt.verifyToken, authJwt.isBossOrDeveloperOrAdmin],
        controller.bossOrDeveloperOrAdminBoard
    );

    app.get(
        "/api/test/bossOrPm", [authJwt.verifyToken, authJwt.isBossOrPm],
        controller.bossOrPmBoard
    );

    app.get(
        "/api/test/bossOrAdmin", [authJwt.verifyToken, authJwt.isBossOrAdmin],
        controller.bossOrAdminBoard
    );

    // Retrieve all Licenze
    app.get("/api/test", controller.findAll);

    // Delete a Account with id
    app.delete("/api/test/elimina/:id", controller.delete);
};