import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import employeesModel from "../models/employeesModel.js";
import companiesModel from "../models/companiesModel.js";
import departmentsModel from "../models/departmentsModel.js";
import branchesModel from "../models/branchesModel.js";
import shiftsModel from "../models/shiftsModel.js";

const login = async (req, res) => {
    const { workerId, password } = req.body;

    try {
        console.log("\x1b[44m%s\x1b[0m", `${workerId} ${password}`);
        const employee = await employeesModel.findOne({
            where: { workerId: workerId },
        });
        console.log("\x1b[44m%s\x1b[0m", `${employee}`);
        if (!employee) {
            return res
                .status(401)
                .json({ errorMessage: "Wrong workerId or password" });
        }
        const passwordValid = await bcrypt.compare(
            password,
            employee.passwordHash
        );
        if (!passwordValid) {
            return res
                .status(401)
                .json({ errorMessage: "Wrong workerId or password" });
        }
        const token = jwt.sign(
            {
                idEmployee: employee.idEmployee,
                email: employee.email,
                name: employee.name,
                lastName: employee.lastName,
                dni: employee.dni,
                workerId: employee.workerId,
                idCompany: employee.idCompany,
            },
            process.env.JWT_SECRET
        );
        res.cookie("token", token, {
            httpOnly: true,
        }).send();
    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
};

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
};

const session = async (req, res) => {
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

        const user = await employeesModel.findByPk(decoded.idEmployee);
        // TODO - user con inner joins
        // res.status(200).json(user);
        console.log("\x1b[44m%s\x1b[0m", `${user}`);

        res.status(200).json({
            idEmployee: decoded.idEmployee,
            email: decoded.email,
            name: decoded.name,
            lastName: decoded.lastName,
            dni: decoded.dni,
            workerId: decoded.workerId,
            idCompany: decoded.idCompany,
        });
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
};

export default {
    login,
    logout,
    session,
};
