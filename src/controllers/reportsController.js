import reportsModel from "../models/reportsModel.js";

const getAll = async (req, res) => {
    try {
        const reports = await reportsModel.findAll();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const report = await reportsModel.findByPk(req.params.id);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const report = await reportsModel.create(req.body);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        // Check if report exists
        const reportExists = await reportsModel.findByPk(req.params.id);
        if (!reportExists) {
            res.status(404).json({ message: `Reporte con ID ${req.params.id} no encontrado.` });
            return;
        }
        // Update report
        const [affectedRows] = await reportsModel.update(req.body, {
            where: {
                idReport: req.params.id
            }
        });

        // Check if some field was updated
        if (affectedRows === 0) {
            res.status(200).json({ message: `No se realizaron cambios en el reporte con ID ${req.params.id}.` });
            return;
        }

        res.status(200).json({ message: `Reporte con ID ${req.params.id} actualizado.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const report = await reportsModel.destroy({
            where: {
                idReport: req.params.id
            }
        });
        res.status(200).json({ message: `Reporte con ID ${req.params.id} eliminado.` });
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