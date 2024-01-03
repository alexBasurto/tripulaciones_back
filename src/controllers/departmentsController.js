import departmentsModel from "../models/departmentsModel.js";

const getAll = async (req, res) => {
    try {
        const departments = await departmentsModel.findAll();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const department = await departmentsModel.findByPk(req.params.id);
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const department = await departmentsModel.create(req.body);
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        // Check if department exists
        const departmentExists = await departmentsModel.findByPk(req.params.id);
        if (!departmentExists) {
            res.status(404).json({ message: `Departamento con ID ${req.params.id} no encontrado.` });
            return;
        }
        // Update department
        const [affectedRows] = await departmentsModel.update(req.body, {
            where: {
                idDepartment: req.params.id
            }
        });

        // Check if some field was updated
        if (affectedRows === 0) {
            res.status(200).json({ message: `No se realizaron cambios en el departamento con ID ${req.params.id}.` });
            return;
        }

        res.status(200).json({ message: `Departamento con ID ${req.params.id} actualizado.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const department = await departmentsModel.destroy({
            where: {
                idDepartment: req.params.id
            }
        });
        res.status(200).json({ message: `Departamento con ID ${req.params.id} eliminado.` });
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
};