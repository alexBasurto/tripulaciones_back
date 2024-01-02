import employeesModel from "../models/employeesModel.js";

const getAll = async (req, res) => {
    try {
        const users = await employeesModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAll
}