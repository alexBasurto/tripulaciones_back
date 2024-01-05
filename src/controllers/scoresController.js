import scoresModel from "../models/scoresModel.js";

const getAll = async (req, res) => {
    try {
        const scores = await scoresModel.findAll();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const score = await scoresModel.findByPk(req.params.id);
        if (score) {
            res.status(200).json(score);
        } else {
            res.status(404).json({ message: 'Puntuación not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAll,
    getById,
};