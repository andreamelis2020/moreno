const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var emailRouter = require('./app/routes/emailRouter');

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
//db.sequelize.sync({ force: true }).then(() => {
//console.log('Drop and Resync Database with { force: true }');
//initial();
//});

// simple route
app.get("/", (req, res) => {
    res.header("x-access-token, Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({ message: "Backend Easy Risparmio" });
});

app.use(bodyParser.json());
app.use('/email', emailRouter);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/comune.routes")(app);
require("./app/routes/ruolo.routes")(app);
require("./app/routes/permesso.routes")(app);
require("./app/routes/contratto.routes")(app);
require("./app/routes/partner.routes")(app);
require("./app/routes/campagna.routes")(app);
require("./app/routes/tipo_offerta.routes")(app);
require("./app/routes/tipo_contratto.routes ")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "admin"
    });

    Role.create({
        id: 2,
        name: "supervisor"
    });

    Role.create({
        id: 3,
        name: "operatore"
    });

    Role.create({
        id: 4,
        name: "agente"
    });
}