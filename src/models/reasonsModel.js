import sequelize from "../config/sequelize.js";

const reasonsModel = sequelize.define('tbReasons', {
    idReason: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    }
});

export default reasonsModel;