import feelingsModel from "../models/feelingsModel.js";

const getAll = async (req, res) => {
    try {
        const feelings = await feelingsModel.findAll();
        res.status(200).json(feelings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const feeling = await feelingsModel.findByPk(req.params.id);
        res.status(200).json(feeling);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAll,
    getById
}