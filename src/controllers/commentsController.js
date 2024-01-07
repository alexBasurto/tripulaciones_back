import commentsModel from "../models/commentsModel.js";

const getAll = async (req, res) => {
    try {
        const comments = await commentsModel.findAll();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const comment = await commentsModel.findByPk(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export default {
    getAll,
    getById,
}