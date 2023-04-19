module.exports = app => {
    const tipi_contratto = require("../controllers/tipo_contratto.controller.js");

    var router = require("express").Router();

    // Create a new Tipo_contratto
    router.post("/", tipi_contratto.create);

    // Retrieve all Tipi_contratto
    router.get("/", tipi_contratto.findAll);

    // Retrieve all published Tipi_contratto
    router.get("/published", tipi_contratto.findAllPublished);

    // Retrieve a single Tipo_contratto with id
    router.get("/:id", tipi_contratto.findOne);

    // Retrieve a single Tipo_contratto with tipo_contratto
    router.get("/:tipo_contratto", tipi_contratto.findOneComune);

    // Retrieve all provincia Tipi_contratto
    router.get("/provincia/:provincia", tipi_contratto.findAllProvincia);

    // Retrieve all Stato tipi_contratto Tipi_contratto
    router.get("/statoComuni/:campo_generale_4", tipi_contratto.findAllStato);

    // Update a Tipo_contratto with id
    router.put("/:id", tipi_contratto.update);

    // Delete a Tipo_contratto with id
    router.delete("/:id", tipi_contratto.delete);

    // Delete all Tipi_contratto
    router.delete("/", tipi_contratto.deleteAll);

    app.use('/api/tipi_contratto', router);
};