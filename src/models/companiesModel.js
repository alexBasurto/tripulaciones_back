import sequelize from "../config/sequelize.js";

const companiesModel = sequelize.define("tbCompanies", {
    idCompany: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CIF: {
        type: sequelize.Sequelize.STRING(10),
        allowNull: false,
        unique: true,
    },
    displayName: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
    razonSocial: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
        unique: true,
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
    tableName: "tbCompanies",
});

export default companiesModel;