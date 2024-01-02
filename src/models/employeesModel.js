import sequelize from "../config/sequelize.js";

const employeesModel = sequelize.define("tbEmployees", {
    idEmployee: {
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
        allowNull: true,
    },
    idBranch: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true,
    },
    idShift: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true,
    },
    name: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
    lastName: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
    dni: {
        type: sequelize.Sequelize.STRING(9),
        allowNull: false,
    },
    mobile: {
        type: sequelize.Sequelize.STRING(15),
        allowNull: false,
    },
    comments: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: true,
    },
    passwordHash: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: true,
    },
    companyAdministrator: {
        type: sequelize.Sequelize.TINYINT,
        allowNull: false,
    },
    superAdministrator: {
        type: sequelize.Sequelize.TINYINT,
        allowNull: false,
    },
}, {
    tableName: "tbEmployees",
});

export default employeesModel;