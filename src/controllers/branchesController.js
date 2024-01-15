import jwt from "jsonwebtoken";
import branchesModel from "../models/branchesModel.js";

const getAll = async (req, res) => {
    try {
        const cookies = req.headers?.cookie
            .split(";")
            .reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split("=");
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idCompany = decoded.idCompany;
        const branches = await branchesModel.findAll();
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const branch = await branchesModel.findByPk(req.params.id);
        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const cookies = req.headers?.cookie
            .split(";")
            .reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split("=");
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idCompany = decoded.idCompany;
        req.body.idCompany = idCompany;
        // Check if the name exists in the database for the same company
        const branchExists = await branchesModel.findOne({
            where: {
                name: req.body.name,
                idCompany: req.body.idCompany
            }
        });
        if (branchExists) {
            res.status(400).json({ message: `La sucursal ${req.body.name} ya existe para la empresa con ID ${req.body.idCompany}.` });
            return;
        }
        const branch = await branchesModel.create(req.body);
        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const cookies = req.headers?.cookie
            .split(";")
            .reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split("=");
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idCompany = decoded.idCompany;
        req.body.idCompany = idCompany;
        
        // Check if branch exists
        const branchExists = await branchesModel.findByPk(req.params.id);
        if (!branchExists) {
            res.status(404).json({ message: `Sede con ID ${req.params.id} no encontrada.` });
            return;
        }
        // Check if there is another branch with the same name for the same company
        const branchExists2 = await branchesModel.findOne({
            where: {
                name: req.body.name,
                idCompany: req.body.idCompany
            }
        });
        if (branchExists2 && branchExists2.idBranch != req.params.id) {
            res.status(400).json({ message: `La sucursal ${req.body.name} ya existe para la empresa con ID ${req.body.idCompany}.` });
            return;
        }
        // Update branch
        const [affectedRows] = await branchesModel.update(req.body, {
            where: {
                idBranch: req.params.id
            }
        });

        // Check if some field was updated
        if (affectedRows === 0) {
            res.status(200).json({ message: `No se realizaron cambios en la sede con ID ${req.params.id}.` });
            return;
        }

        res.status(200).json({ message: `Sede con ID ${req.params.id} actualizada.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const branch = await branchesModel.destroy({
            where: {
                idBranch: req.params.id
            }
        });
        if (branch === 0) {
            res.status(404).json({message: `Sede con ID ${req.params.id} no encontrada.`});
            return;
        }
        res.status(200).json({message: `Sede con ID ${req.params.id} eliminada.`});
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