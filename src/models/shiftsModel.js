import sequelize from "../config/sequelize.js";
import companiesModel from "./companiesModel.js";

const shiftsModel = sequelize.define("tbShifts", {
    idShift: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCompany: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize.Sequelize.STRING(45),
        allowNull: false,
    },
    horarioEntrada: {
        type: sequelize.Sequelize.TIME,
        allowNull: true,
    },
    comments: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: true,
    },
}, {
    tableName: "tbShifts",
});

shiftsModel.belongsTo(companiesModel, {
    foreignKey: 'idCompany',
});

export default shiftsModel;