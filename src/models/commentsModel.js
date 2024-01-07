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
    comment: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: true,
    }
},
    {
        tableName: "tbComments",
    }

);

export default commentsModel;