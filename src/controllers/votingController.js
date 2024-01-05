import votingModel from "../models/votingModel.js";

const getAll = async (req, res) => {
    try {
        const votings = await votingModel.findAll();
        res.status(200).json(votings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLastVote = async (req, res) => {
    try {
        const votings = await votingModel.findAll({
            limit: 1,
            order: [['date', 'DESC']]
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

export default { getAll, getLastVote, create };