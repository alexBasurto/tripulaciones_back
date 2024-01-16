import jwt from "jsonwebtoken";
import shiftsModel from "../models/shiftsModel.js";

const getAll = async (req, res) => {
    try {
        const cookies = req.headers?.cookie
            .split(";")
            .reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split("=");
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.adminToken;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idCompany = decoded.idCompany;

        const shifts = await shiftsModel.findAll(
            {
                where: {
                    idCompany: idCompany
                }
            }
        );
        res.status(200).json(shifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const shift = await shiftsModel.findByPk(req.params.id);
        res.status(200).json(shift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const cookies = req.headers?.cookie
            .split(";")
            .reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split("=");
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.adminToken;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idCompany = decoded.idCompany;
        req.body.idCompany = idCompany;

        const shift = await shiftsModel.create(req.body);
        res.status(200).json(shift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const cookies = req.headers?.cookie
            .split(";")
            .reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split("=");
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.adminToken;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idCompany = decoded.idCompany;
        req.body.idCompany = idCompany;
        // Check if shift exists
        const shiftExists = await shiftsModel.findByPk(req.params.id);
        if (!shiftExists) {
            res.status(404).json({
                message: `Turno con ID ${req.params.id} no encontrado.`,
            });
            return;
        }
        // Update shift
        const [affectedRows] = await shiftsModel.update(req.body, {
            where: {
                idShift: req.params.id,
            },
        });

        // Check if some field was updated
        if (affectedRows === 0) {
            res.status(200).json({
                message: `No se realizaron cambios en el turno con ID ${req.params.id}.`,
            });
            return;
        }

        res.status(200).json({
            message: `Turno con ID ${req.params.id} actualizado.`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const shift = await shiftsModel.destroy({
            where: {
                idShift: req.params.id,
            },
        });
        if (shift === 0) {
            res.status(404).json({
                message: `Turno con ID ${req.params.id} no encontrado.`,
            });
            return;
        }
        res.status(200).json({
            message: `Turno con ID ${req.params.id} eliminado.`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
