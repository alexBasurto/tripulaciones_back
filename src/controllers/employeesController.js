import employeesModel from "../models/employeesModel.js";

const getAll = async (req, res) => {
    try {
        const users = await employeesModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const user = await employeesModel.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const user = await employeesModel.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        // Check if user exists
        const userExists = await employeesModel.findByPk(req.params.id);
        if (!userExists) {
            res.status(404).json({ message: `Empleado con ID ${req.params.id} no encontrado.` });
            return;
        }
        // Update user
        const [affectedRows] = await employeesModel.update(req.body, {
            where: {
                idEmployee: req.params.id
            }
        });

        // Check if some field was updated
        if (affectedRows === 0) {
            res.status(200).json({ message: `No se realizaron cambios en el empleado con ID ${req.params.id}.` });
            return;
        }

        res.status(200).json({ message: `Empleado con ID ${req.params.id} actualizado.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const user = await employeesModel.destroy({
            where: {
                idEmployee: req.params.id
            }
        });
        if (user === 0) {
            res.status(404).json({message: `Empleado con ID ${req.params.id} no encontrado.`});
            return;
        }
        res.status(200).json({message: `Empleado con ID ${req.params.id} eliminado.`});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
}