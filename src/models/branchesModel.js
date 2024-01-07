import sequelize from "../config/sequelize.js";

const branchesModel = sequelize.define("tbBranches", {
    idBranch: {
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
    address: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: false,
    },
    city: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
    country: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    },
    comments: {
        type: sequelize.Sequelize.STRING(200),
        allowNull: true,
    },
}, {
    tableName: "tbBranches",
});

export default branchesModel;