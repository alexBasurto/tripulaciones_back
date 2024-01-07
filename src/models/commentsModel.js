import sequelize from "../config/sequelize.js";

const commentsModel = sequelize.define("tbComments", {
    idComment: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCompany: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    idEmployee: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    comments: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: true,
    }
});

export default commentsModel;