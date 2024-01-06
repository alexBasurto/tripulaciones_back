import sequelize from "../config/sequelize.js";

const reportsModel = sequelize.define("tbReports", {
    idComment: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCompany: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    idDepartment: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    idEmployee: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
    },
    comments: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: true,
    },
    status: {
        type: sequelize.Sequelize.STRING(20),
        allowNull: false,
    },
});

export default reportsModel;