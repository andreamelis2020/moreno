const { ruolo } = require("../models/index.js");

module.exports = app => {
    const ruoli = require("../controllers/ruolo.controller.js");

    var router = require("express").Router();

    // Create a new Ruolo
    router.post("/", ruoli.create);

    // Retrieve all Ruoli
    router.get("/", ruoli.findAll);

    // Retrieve a single Ruolo with id
    router.get("/prova/:userId", ruoli.findOne);

    // Retrieve a single Ruolo with ruolo
    router.get("/:id", ruoli.findOneComune);

    // Retrieve all Stato ruoli Ruoli
    router.get("/statoComuni/:campo_generale_4", ruoli.findAllStato);

    // Update a Ruolo with roleId
    router.put("/:userId", ruoli.update);

    // Delete a Ruolo with id
    router.delete("/:id", ruoli.delete);

    // Delete all Ruoli
    router.delete("/", ruoli.deleteAll);

    // Retrieve all userId 
    router.get("/userId/:userId", ruoli.findAllProvincia);

    app.use('/api/ruoli', router);


};