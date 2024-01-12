import sequelize from "../config/sequelize.js";

const votingReasonsModel = sequelize.define('tbVotingReasons', {
    idVotingReasons: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idVoting: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    },
    idReason: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbVotingReasons',
});

export default votingReasonsModel;