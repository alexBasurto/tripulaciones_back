import votingModel from "../models/votingModel.js";
import votingFeelingsModel from "../models/votingFeelingsModel.js";
import feelingsModel from "../models/feelingsModel.js";
import reasonsModel from "../models/reasonsModel.js";
import commentsModel from "../models/commentsModel.js";
import tagsModel from "../models/tagsModel.js";

const getData = async (req, res) => {
try {
    // GRÁFICO 1: Votos por empresa
    if (req.body.chart === 1) {
            const data = await votingModel.findAll({
                where: {
                    idCompany: req.body.idCompany
                }
            });
            res.status(200).json(data);
    }

    // GRÁFICO 2: Votos por empresa y sentimiento
    if (req.body.chart === 2) {
            const [data, metadata] = await votingFeelingsModel.sequelize.query(
                `SELECT * FROM tbVotingFeelings WHERE idVoting IN (SELECT idVoting FROM tbVoting WHERE idCompany = ${req.body.idCompany});`
            );
            const feelings = await feelingsModel.findAll();
            res.status(200).json({ data, feelings });
    }

    // GRÁFICO 3: Votos por empresa y razones
    if (req.body.chart === 3) {
            const [data, metadata] = await votingFeelingsModel.sequelize.query(
                `SELECT * FROM tbVotingFeelings WHERE idVoting IN (SELECT idVoting FROM tbVoting WHERE idCompany = ${req.body.idCompany});`
            );
            const reasons = await reasonsModel.findAll();
            res.status(200).json({ data, reasons });
        } 


    // GRÁFICO 4: Comentarios
    if (req.body.chart === 4) {
            const data = await commentsModel.findAll({
                where: {
                    idCompany: req.body.idCompany
                }
            });
            const tags = await tagsModel.findAll();
            res.status(200).json({ data, tags });
}
}
catch (error) {
    console.error("Error en la solicitud:", error.message);
    throw error;
}
}

export default {
    getData
}