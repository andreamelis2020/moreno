module.exports = app => {
    const permesso = require("../controllers/permesso.controller.js");

    var router = require("express").Router();

    // Create a new Ruolo
    router.post("/", permesso.create);

    // Retrieve all Ruoli
    router.get("/", permesso.findAll);

    // Retrieve all published Ruoli
    router.get("/published", permesso.findAllPublished);

    // Retrieve a single Ruolo with id
    router.get("/:id", permesso.findOne);

    // Retrieve a single Ruolo with ruolo
    router.get("/:ruolo", permesso.findOneComune);

    // Retrieve all provincia Ruoli
    router.get("/provincia/:provincia", permesso.findAllProvincia);

    // Retrieve all Stato permesso Ruoli
    router.get("/statoComuni/:campo_generale_4", permesso.findAllStato);

    // Update a Ruolo with id
    router.put("/:id", permesso.update);

    // Delete a Ruolo with id
    router.delete("/:id", permesso.delete);

    // Delete all Ruoli
    router.delete("/", permesso.deleteAll);

    app.use('/api/permesso', router);
};