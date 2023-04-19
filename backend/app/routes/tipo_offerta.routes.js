module.exports = app => {
    const tipi_offerta = require("../controllers/tipo_offerta.controller.js");

    var router = require("express").Router();

    // Create a new Tipo_offerta
    router.post("/", tipi_offerta.create);

    // Retrieve all Tipi_offerta
    router.get("/", tipi_offerta.findAll);

    // Retrieve all published Tipi_offerta
    router.get("/published", tipi_offerta.findAllPublished);

    // Retrieve a single Tipo_offerta with id
    router.get("/:id", tipi_offerta.findOne);

    // Retrieve a single Tipo_offerta with tipo_offerta
    router.get("/:tipo_offerta", tipi_offerta.findOneComune);

    // Retrieve all provincia Tipi_offerta
    router.get("/provincia/:provincia", tipi_offerta.findAllProvincia);

    // Retrieve all Stato tipi_offerta Tipi_offerta
    router.get("/statoComuni/:campo_generale_4", tipi_offerta.findAllStato);

    // Update a Tipo_offerta with id
    router.put("/:id", tipi_offerta.update);

    // Delete a Tipo_offerta with id
    router.delete("/:id", tipi_offerta.delete);

    // Delete all Tipi_offerta
    router.delete("/", tipi_offerta.deleteAll);

    app.use('/api/tipi_offerta', router);
};