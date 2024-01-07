import reasonsModel from "../models/reasonsModel.js";

const getAll = async (req, res) => {
    try {
        const reasons = await reasonsModel.findAll();
        res.status(200).json(reasons);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const reason = await reasonsModel.findByPk(req.params.id);
        res.status(200).json(reason);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAll,
    getById
}