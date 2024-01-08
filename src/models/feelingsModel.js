import sequelize from "../config/sequelize.js";

const feelingsModel = sequelize.define('tbFeelings', {
    idFeeling: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
    }
},{
    tableName: 'tbFeelings',
});

export default feelingsModel;