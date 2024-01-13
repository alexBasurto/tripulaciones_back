import jwt from 'jsonwebtoken';
import employeesModel from '../models/employeesModel.js';

const isAuthenticated = (req, res, next) => {
    // comprueba si está autenticado a través de la cookie
    try {
        if (!req.headers?.cookie) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }
        else if (req.headers?.cookie) {
            const cookies = req.headers?.cookie.split(';').reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split('=');
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ errorMessage: "Unauthorized" });
        next();
    }
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

const isAdministrator = (req, res, next) => {
    // comprueba si está autenticado a través de la cookie
    try {
        if (!req.headers?.cookie) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }
        else if (req.headers?.cookie) {
            const cookies = req.headers?.cookie.split(';').reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split('=');
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ errorMessage: "Unauthorized" });
        employeesModel.findByPk(decoded.idEmployee).then(employee => {
            if (employee.companyAdministrator === 1) {
                next();
            } else {
                res.status(401).json({ errorMessage: "Unauthorized" });
            }
        }
        );

    }
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

const isSuperAdministrator = (req, res, next) => {
    // comprueba si está autenticado a través de la cookie
    try {
        if (!req.headers?.cookie) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }
        else if (req.headers?.cookie) {
            const cookies = req.headers?.cookie.split(';').reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split('=');
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ errorMessage: "Unauthorized" });
        employeesModel.findByPk(decoded.idEmployee).then(employee => {
            if (employee.superAdministrator === 1) {
                next();
            } else {
                res.status(401).json({ errorMessage: "Unauthorized" });
            }
        }
        );

    }
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}
    
export { isAuthenticated, isAdministrator, isSuperAdministrator };