import sequelize from "../config/sequelize.js";

const votingFeelingsModel = sequelize.define('tbVotingFeelings', {
    idVotingFeelings: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idFeeling: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    },
    idVoting: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbVotingFeelings',
});

export default votingFeelingsModel;