const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.ruolo = require("../models/ruolo.model.js")(sequelize, Sequelize);
db.comuni = require("../models/comune.model.js")(sequelize, Sequelize);
db.comuni = require("../models/contratto.model.js")(sequelize, Sequelize);
db.partners = require("../models/partner.model.js")(sequelize, Sequelize);
db.campagne = require("../models/campagna.model.js")(sequelize, Sequelize);
db.tipi_offerta = require("../models/tipo_offerta.model.js")(sequelize, Sequelize);
db.tipi_contratto = require("../models/tipo_contratto.model .js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;