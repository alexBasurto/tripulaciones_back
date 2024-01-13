import scoresModel from "../models/scoresModel.js";

const getAll = async (req, res) => {
    try {
        const scores = await scoresModel.findAll();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAll,
};