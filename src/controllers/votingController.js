import votingModel from "../models/votingModel.js";
import votingReasonsModel from "../models/votingReasonsModel.js";
import votingFeelingsModel from "../models/votingFeelingsModel.js";

const getAllByIdCompany = async (req, res) => {
    try {
        if (req.params.id) {
            if (req.params.id === "all") {
                const votings = await votingModel.findAll();
                res.status(200).json(votings);
            } else {
                const votings = await votingModel.findAll({
                    where: {
                        idCompany: req.params.id,
                    },
                });
                res.status(200).json(votings);
            }
        } else {
            res.status(400).json({ message: "Missing parameters" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const {
            idEmployee,
            idCompany,
            previousDay,
            previousDayScore,
            currentDay,
            currentDayScore,
        } = req.body;
        const voting = await votingModel.create({
            idEmployee,
            idCompany,
            previousDay,
            previousDayScore,
            currentDay,
            currentDayScore,
        });

        res.status(200).json({
            message: "Votación guardada correctamente",
            idVoting: voting.idVoting,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userRecentVotingData = async (req, res) => {
    try {
        const { idEmployee, idCompany } = req.body;
        // Obtener el voto con la fecha en currentDay más reciente
        const latestVoting = await votingModel.findOne({
            where: {
                idEmployee,
                idCompany,
            },
            order: [["currentDay", "DESC"]],
        });

        if (!latestVoting) {
            res.status(200).json({
                latestVoting: null,
                streak: 0,
            });
        } else {
            // Calcular la racha de fechas consecutivas hacia atrás desde currentDay
            let streak = 0;
            let dateToCheck = latestVoting.currentDay;

            while (true) {
                const voting = await votingModel.findOne({
                    where: {
                        idEmployee,
                        idCompany,
                        currentDay: dateToCheck,
                    },
                });

                if (!voting) {
                    break;
                }
                streak++;

                dateToCheck = new Date(dateToCheck);
                dateToCheck.setDate(dateToCheck.getDate() - 1);
                dateToCheck = dateToCheck.toISOString().slice(0, 10);
            }

            // Devolver los datos
            res.status(200).json({
                latestVoting,
                streak,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllByIdCompany, create, userRecentVotingData };
