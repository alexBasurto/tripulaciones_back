import votingModel from "../models/votingModel.js";

const getAllByIdCompany = async (req, res) => {
    try {
        if (req.params.id) {
            if (req.params.id === 'all') {
                const votings = await votingModel.findAll();
                res.status(200).json(votings);
            }
            else {
                const votings = await votingModel.findAll({
                    where: {
                        idCompany: req.params.id
                    }
                });
                res.status(200).json(votings);
            }
        }
        else {
            res.status(400).json({ message: 'Missing parameters' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatestByIdEmployee = async (req, res) => {
    try {
        const votings = await votingModel.findAll({
            where: {
                idEmployee: req.params.id
            },
            order: [['currentDay', 'DESC']],
            limit: 1
        });
        res.status(200).json(votings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const voting = await votingModel.create(req.body);
        res.status(200).json(voting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { getAllByIdCompany, getLatestByIdEmployee, create };