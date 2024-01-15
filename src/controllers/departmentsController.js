import jwt from "jsonwebtoken";
import departmentsModel from "../models/departmentsModel.js";

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
        const departments = await departmentsModel.findAll(
            {
                where: {
                    idCompany: idCompany
                }
            }
        );
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
        // Check if the name exists in the database for the same company
        const departmentExists = await departmentsModel.findOne({
            where: {
                name: req.body.name,
                idCompany: idCompany
            }
        });
        if (departmentExists) {
            res.status(400).json({ message: `El departamento ${req.body.name} ya existe para la empresa con ID ${idCompany}.` });
            return;
        }

        req.body.idCompany = idCompany;
        const department = await departmentsModel.create(req.body);
        res.status(200).json(department);
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
        res.status(500).json({ message: 'No se puede eliminar el departamento.' });
    }
}

export default {
    getAll,
    getById, 
    create, 
    update, 
    remove 
};