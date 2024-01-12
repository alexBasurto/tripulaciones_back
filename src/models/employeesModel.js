import sequelize from "../config/sequelize.js";

import companiesModel from "./companiesModel.js";
import departmentsModel from "./departmentsModel.js";
import branchesModel from "./branchesModel.js";
import shiftsModel from "./shiftsModel.js";
import votingModel from "./votingModel.js";

const employeesModel = sequelize.define("tbEmployees", {
    idEmployee: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
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
    workerId: {
        type: sequelize.Sequelize.STRING(15),
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

employeesModel.belongsTo(companiesModel, { foreignKey: "idCompany" });
employeesModel.belongsTo(departmentsModel, { foreignKey: "idDepartment" });
employeesModel.belongsTo(branchesModel, { foreignKey: "idBranch" });
employeesModel.belongsTo(shiftsModel, { foreignKey: "idShift" });
employeesModel.hasMany(votingModel, { foreignKey: "idEmployee" });

export default employeesModel;
