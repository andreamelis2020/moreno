module.exports = (sequelize, Sequelize) => {
    const Ruolo = sequelize.define("user_roles", {
        roleId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return Ruolo;
};