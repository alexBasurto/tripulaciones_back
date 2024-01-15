import jwt from "jsonwebtoken";
import employeesModel from "../models/employeesModel.js";

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

        const [users, metadata] = await employeesModel.sequelize.query(
            `SELECT 
            e.idEmployee,
            e.idDepartment, 
            e.idBranch, 
            e.idShift, 
            e.name, 
            e.lastName, 
            e.email, 
            e.dni, 
            e.workerId, 
            e.mobile, 
            e.comments, 
            e.companyAdministrator, 
            e.superAdministrator,
            d.name AS departmentName, 
            s.name AS shiftName, 
            b.name AS branchName
        FROM 
            tripulaciones.tbEmployees e
        INNER JOIN 
            tripulaciones.tbDepartments d ON e.idDepartment = d.idDepartment AND e.idCompany = d.idCompany
        INNER JOIN 
            tripulaciones.tbShifts s ON e.idShift = s.idShift AND e.idCompany = s.idCompany
        INNER JOIN 
            tripulaciones.tbBranches b ON e.idBranch = b.idBranch AND e.idCompany = b.idCompany
        WHERE 
            e.idCompany = ${idCompany}
        ORDER BY
            e.lastName ASC;
`
        );
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const user = await employeesModel.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const user = await employeesModel.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        // Check if user exists
        const userExists = await employeesModel.findByPk(req.params.id);
        if (!userExists) {
            res.status(404).json({
                message: `Empleado con ID ${req.params.id} no encontrado.`,
            });
            return;
        }
        // Update user
        const [affectedRows] = await employeesModel.update(req.body, {
            where: {
                idEmployee: req.params.id,
            },
        });

        // Check if some field was updated
        if (affectedRows === 0) {
            res.status(200).json({
                message: `No se realizaron cambios en el empleado con ID ${req.params.id}.`,
            });
            return;
        }

        res.status(200).json({
            message: `Empleado con ID ${req.params.id} actualizado.`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const user = await employeesModel.destroy({
            where: {
                idEmployee: req.params.id,
            },
        });
        if (user === 0) {
            res.status(404).json({
                message: `Empleado con ID ${req.params.id} no encontrado.`,
            });
            return;
        }
        res.status(200).json({
            message: `Empleado con ID ${req.params.id} eliminado.`,
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
