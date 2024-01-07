import sequelize from "../config/sequelize.js";

const scoresModel = sequelize.define("tbScores", {
    idScore: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
}, {
    tableName: "tbScores",
});

export default scoresModel;