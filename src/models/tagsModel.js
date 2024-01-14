import sequelize from "../config/sequelize.js";


const tagsModel = sequelize.define("tbTags", {
    idTag: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize.Sequelize.STRING(45),
        allowNull: false,
    },
}, {
    tableName: "tbTags",
});

export default tagsModel;