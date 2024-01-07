import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import employeesModel from '../models/employeesModel.js';

const login = async (req, res) => {
    const { dni, password } = req.body;

    try {
        console.log('\x1b[44m%s\x1b[0m', `${dni} ${password}`);
        const employee = await employeesModel.findOne({ where: { dni: dni } });
        if (!employee) {
            return res.status(401).json({ errorMessage: "Wrong dni or password" });
        }
        const passwordValid = await bcrypt.compare(password, employee.passwordHash);
        if (!passwordValid) {
            return res.status(401).json({ errorMessage: "Wrong dni or password" });
        }
        const token = jwt.sign({ idEmployee: employee.idEmployee, email: employee.email, name: employee.name, lastName: employee.lastName, dni: employee.dni }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true
        }).send();
    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
}

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
}

const session = (req, res) => {
    try {
        const cookies = req.headers?.cookie.split(';').reduce((cookiesObject, cookie) => {
            const [name, value] = cookie.trim().split('=');
            cookiesObject[name] = value;
            return cookiesObject;
        }, {});
        const token = cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ idEmployee: decoded.idEmployee, email: decoded.email, name: decoded.name, lastName: decoded.lastName, dni: decoded.dni });
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

export default {
    login,
    logout,
    session
}
