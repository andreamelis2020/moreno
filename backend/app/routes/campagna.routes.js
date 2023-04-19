module.exports = app => {
    const campagne = require("../controllers/campagna.controller.js");

    var router = require("express").Router();

    // Create a new Campagna
    router.post("/", campagne.create);

    // Retrieve all Campagne
    router.get("/", campagne.findAll);

    // Retrieve all published Campagne
    router.get("/published", campagne.findAllPublished);

    // Retrieve a single Campagna with id
    router.get("/:id", campagne.findOne);

    // Retrieve a single Campagna with campagna
    router.get("/:campagna", campagne.findOneComune);

    // Retrieve all provincia Campagne
    router.get("/provincia/:provincia", campagne.findAllProvincia);

    // Retrieve all Stato campagne Campagne
    router.get("/statoComuni/:campo_generale_4", campagne.findAllStato);

    // Update a Campagna with id
    router.put("/:id", campagne.update);

    // Delete a Campagna with id
    router.delete("/:id", campagne.delete);

    // Delete all Campagne
    router.delete("/", campagne.deleteAll);

    app.use('/api/campagne', router);
};