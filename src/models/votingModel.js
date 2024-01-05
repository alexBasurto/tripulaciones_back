import sequelize from "../config/sequelize.js";

const votingModel = sequelize.define("tbVoting", {
    idVoting: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idEmployee: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    score: {
        type: sequelize.Sequelize.TINYINT,
        allowNull: true,
    },
    entry: {
        type: sequelize.Sequelize.TINYINT,
        allowNull: false,
    },
    date: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
    },  
},
{
    tableName: "tbVoting",
});


export default votingModel;