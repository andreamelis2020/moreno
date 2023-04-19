module.exports = app => {
    const contratti = require("../controllers/contratto.controller.js");

    var router = require("express").Router();

    // Create a new Contratto
    router.post("/", contratti.create);

    // Retrieve all Contratti
    router.get("/", contratti.findAll);

    // Retrieve all published Contratti
    router.get("/published", contratti.findAllPublished);

    // Retrieve a single Contratto with id
    router.get("/:id", contratti.findOne);

    // Retrieve a single Contratto with contratto
    router.get("/:contratto", contratti.findOneComune);

    // Retrieve all provincia Contratti
    router.get("/provincia/:provincia", contratti.findAllProvincia);

    // Retrieve all Stato contratti Contratti
    router.get("/statoComuni/:campo_generale_4", contratti.findAllStato);

    // Update a Contratto with id
    router.put("/:id", contratti.update);

    // Delete a Contratto with id
    router.delete("/:id", contratti.delete);

    // Delete all Contratti
    router.delete("/", contratti.deleteAll);

    app.use('/api/contratti', router);
};