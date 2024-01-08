import sequelize from "../config/sequelize.js";

const departmentsModel = sequelize.define("tbDepartments", {
    idDepartment: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCompany: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
    comments: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: true,
    },
},{
    tableName: "tbDepartments",
});

export default departmentsModel;