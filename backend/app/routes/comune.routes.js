module.exports = app => {
    const comuni = require("../controllers/comune.controller.js");

    var router = require("express").Router();

    // Create a new Comune
    router.post("/", comuni.create);

    // Retrieve all Comuni
    router.get("/", comuni.findAll);

    // Retrieve all published Comuni
    router.get("/published", comuni.findAllPublished);

    // Retrieve a single Comune with id
    router.get("/:id", comuni.findOne);

    // Retrieve a single Comune with comune
    router.get("/:comune", comuni.findOneComune);

    // Retrieve all provincia Comuni
    router.get("/provincia/:provincia", comuni.findAllProvincia);

    // Retrieve all Stato comuni Comuni
    router.get("/statoComuni/:campo_generale_4", comuni.findAllStato);

    // Update a Comune with id
    router.put("/:id", comuni.update);

    // Delete a Comune with id
    router.delete("/:id", comuni.delete);

    // Delete all Comuni
    router.delete("/", comuni.deleteAll);

    app.use('/api/comuni', router);
};