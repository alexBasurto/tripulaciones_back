import companiesModel from "../models/companiesModel.js";

const getAll = async (req, res) => {
    try {
        const users = await companiesModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const user = await companiesModel.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const company = await companiesModel.create(req.body);
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        // Check if company exists
        const companyExists = await companiesModel.findByPk(req.params.id);
        if (!companyExists) {
            res.status(404).json({ message: `Compañía con ID ${req.params.id} no encontrada.` });
            return;
        }
        // Update company
        const [affectedRows] = await companiesModel.update(req.body, {
            where: {
                idCompany: req.params.id
            }
        });

        // Check if some field was updated
        if (affectedRows === 0) {
            res.status(200).json({ message: `No se realizaron cambios en ${req.params.id}.` });
            return;
        }

        res.status(200).json({ message: `Compañía con ID ${req.params.id} actualizada.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const company = await companiesModel.destroy({
            where: {
                idCompany: req.params.id
            }
        });
        if (company === 0) {
            res.status(404).json({message: `Compañía con ID ${req.params.id} no encontrada.`});
            return;
        }
        res.status(200).json({message: `Compañía con ID ${req.params.id} eliminado.`});
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