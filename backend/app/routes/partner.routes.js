module.exports = app => {
    const partners = require("../controllers/partner.controller.js");

    var router = require("express").Router();

    // Create a new Partner
    router.post("/", partners.create);

    // Retrieve all Partners
    router.get("/", partners.findAll);

    // Retrieve all published Partners
    router.get("/published", partners.findAllPublished);

    // Retrieve a single Partner with id
    router.get("/:id", partners.findOne);

    // Retrieve a single Partner with partner
    router.get("/:partner", partners.findOneComune);

    // Retrieve all provincia Partners
    router.get("/provincia/:provincia", partners.findAllProvincia);

    // Retrieve all Stato partners Partners
    router.get("/statoComuni/:campo_generale_4", partners.findAllStato);

    // Update a Partner with id
    router.put("/:id", partners.update);

    // Delete a Partner with id
    router.delete("/:id", partners.delete);

    // Delete all Partners
    router.delete("/", partners.deleteAll);

    app.use('/api/partners', router);
};