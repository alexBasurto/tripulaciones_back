import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import employeesModel from "../models/employeesModel.js";
import companiesModel from "../models/companiesModel.js";
import departmentsModel from "../models/departmentsModel.js";
import branchesModel from "../models/branchesModel.js";
import shiftsModel from "../models/shiftsModel.js";
import votingModel from "../models/votingModel.js";

const login = async (req, res) => {
    const { workerId, password } = req.body;

    try {
        const employee = await employeesModel.findOne({
            where: { workerId: workerId },
        });
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

        const literal = `
            SELECT
                e.idEmployee,
                e.email,
                e.name,
                e.lastName,
                e.dni,
                e.workerId,
                e.idCompany,
                e.idDepartment,
                e.idBranch,
                e.idShift,
                c.displayName AS companyName,
                d.name AS departmentName,
                b.name AS branchName,
                s.name AS shiftName
            FROM tbEmployees e
            INNER JOIN tbCompanies c ON e.idCompany = c.idCompany
            LEFT JOIN tbDepartments d ON e.idDepartment = d.idDepartment
            LEFT JOIN tbBranches b ON e.idBranch = b.idBranch
            LEFT JOIN tbShifts s ON e.idShift = s.idShift
            WHERE e.idEmployee = ${decoded.idEmployee}
        `;
        const [userDetail, metadata] = await employeesModel.sequelize.query(literal);
        
        // construir query para obtener la cantidad de empleados de la empresa
        // y que estén en el mismo departamento, sucursal y turno que el usuario logueado
        // y que tenga en cuenta si idDepartment o idBranc o idShift es null
        let employeeCountQuery = `
            SELECT COUNT(*) AS employeesCount
            FROM tbEmployees e
            WHERE e.idCompany = ${decoded.idCompany}
        `;

        if (userDetail[0].idDepartment !== null) {
            employeeCountQuery += ` AND e.idDepartment = ${userDetail[0].idDepartment}`;
        }
        if (userDetail[0].idBranch !== null) {
            employeeCountQuery += ` AND e.idBranch = ${userDetail[0].idBranch}`;
        }
        if (userDetail[0].idShift !== null) {
            employeeCountQuery += ` AND e.idShift = ${userDetail[0].idShift}`;
        }
        const [employeesCount, metadata2] = await employeesModel.sequelize.query(employeeCountQuery);

        const [latestVoting, metadata3] = await employeesModel.sequelize.query(`
            SELECT *
            FROM tbVoting v
            WHERE v.idEmployee = ${decoded.idEmployee}
            AND v.idCompany = ${decoded.idCompany}
            ORDER BY v.currentDay DESC
            LIMIT 1
        `);

        // Calcular la racha de fechas consecutivas hacia atrás desde currentDay
        // Y alimentar un array donde indique si votó o no en cada fecha los últimos 7 días
        if (latestVoting.length === 0) {
            latestVoting.push({
                currentDay: 0,
                currentDayScore: 0,
            });
        }

        let streak = 0;
        let streakFlag = true;
        let counter = 0;
        let dateToCheck = new Date();
        dateToCheck.setDate(dateToCheck.getDate());
        dateToCheck = dateToCheck.toISOString().slice(0, 10);
        let lastWeekVotes = [];

        while (true) {
            // chequea si dateToCheck es fin de semana
            const date = new Date(dateToCheck);
            const day = date.getDay();
            const isWeekend = (day === 6) || (day === 0);
            let voting = '';

            if (!isWeekend) {
                voting = await votingModel.findOne({
                    where: {
                        idEmployee: decoded.idEmployee,
                        idCompany: decoded.idCompany,
                        currentDay: dateToCheck,
                    },
                });
            } else {
                // retrasa un día
                dateToCheck = new Date(dateToCheck);
                dateToCheck.setDate(dateToCheck.getDate() - 1);
                dateToCheck = dateToCheck.toISOString().slice(0, 10);
                continue;
            }

            if (!voting) {
                streakFlag = false;
            }
            
            if (streakFlag) {
                streak++;
            }

            if (counter === 5) {
                break;
            }

            // voting ? lastWeekVotes.push(1) : lastWeekVotes.push(0);
            // añade al array un objeto, donde la clave sea el día de la semana y el valor sea 1 si voting y 0 si no voting
            const daysOfWeekCaps = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
            if (voting) {
                lastWeekVotes.push({
                    [daysOfWeekCaps[day]]: 1,
                });
            } else {
                lastWeekVotes.push({
                    [daysOfWeekCaps[day]]: 0,
                });
            }

            counter++;

            dateToCheck = new Date(dateToCheck);
            dateToCheck.setDate(dateToCheck.getDate() - 1);
            dateToCheck = dateToCheck.toISOString().slice(0, 10);
        }

        res.status(200).json({
            idEmployee: decoded.idEmployee,
            email: decoded.email,
            name: decoded.name,
            lastName: decoded.lastName,
            dni: decoded.dni,
            workerId: decoded.workerId,
            idCompany: decoded.idCompany,
            companyName: userDetail[0].companyName,
            idDepartment: userDetail[0].idDepartment,
            departmentName: userDetail[0].departmentName,
            idBranch: userDetail[0].idBranch,
            branchName: userDetail[0].branchName,
            idShift: userDetail[0].idShift,
            shiftName: userDetail[0].shiftName,
            employeesCount: employeesCount[0].employeesCount,
            latestVoting: latestVoting,
            streak: streak,
            lastWeekVotes: lastWeekVotes,
        });
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { workerId, password } = req.body;
        const employee = await employeesModel.findOne({
            where: { workerId: workerId },
        });
        if (!employee) {
            return res
                .status(401)
                .json({ errorMessage: "Wrong workerId or password" });
        }
        if (employee.companyAdministrator === 0) {
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
                isAdmin: 'isAdmin',
            },
            process.env.JWT_SECRET
        );
        res.cookie("adminToken", token, {
            httpOnly: true,
        }).send();
    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
};

const logoutAdmin = (req, res) => {
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
};

const sessionAdmin = async (req, res) => {
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
        if (!decoded.isAdmin) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }

        const literal = `
            SELECT
                e.idEmployee,
                e.email,
                e.name,
                e.lastName,
                e.dni,
                e.workerId,
                e.idCompany,
                e.idDepartment,
                e.idBranch,
                e.idShift,
                c.displayName AS companyName,
                d.name AS departmentName,
                b.name AS branchName,
                s.name AS shiftName
            FROM tbEmployees e
            INNER JOIN tbCompanies c ON e.idCompany = c.idCompany
            LEFT JOIN tbDepartments d ON e.idDepartment = d.idDepartment
            LEFT JOIN tbBranches b ON e.idBranch = b.idBranch
            LEFT JOIN tbShifts s ON e.idShift = s.idShift
            WHERE e.idEmployee = ${decoded.idEmployee}
        `;
        const [userDetail, metadata] = await employeesModel.sequelize.query(literal);
        
        if (userDetail[0].companyAdministrator === 0) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }
        // construir query para obtener la cantidad de empleados de la empresa
        // y que estén en el mismo departamento, sucursal y turno que el usuario logueado
        // y que tenga en cuenta si idDepartment o idBranc o idShift es null
        let employeeCountQuery = `
            SELECT COUNT(*) AS employeesCount
            FROM tbEmployees e
            WHERE e.idCompany = ${decoded.idCompany}
        `;

        if (userDetail[0].idDepartment !== null) {
            employeeCountQuery += ` AND e.idDepartment = ${userDetail[0].idDepartment}`;
        }
        if (userDetail[0].idBranch !== null) {
            employeeCountQuery += ` AND e.idBranch = ${userDetail[0].idBranch}`;
        }
        if (userDetail[0].idShift !== null) {
            employeeCountQuery += ` AND e.idShift = ${userDetail[0].idShift}`;
        }
        const [employeesCount, metadata2] = await employeesModel.sequelize.query(employeeCountQuery);

        const [latestVoting, metadata3] = await employeesModel.sequelize.query(`
            SELECT *
            FROM tbVoting v
            WHERE v.idEmployee = ${decoded.idEmployee}
            AND v.idCompany = ${decoded.idCompany}
            ORDER BY v.currentDay DESC
            LIMIT 1
        `);

        // Calcular la racha de fechas consecutivas hacia atrás desde currentDay
        // Y alimentar un array donde indique si votó o no en cada fecha los últimos 7 días
        if (latestVoting.length === 0) {
            latestVoting.push({
                currentDay: 0,
                currentDayScore: 0,
            });
        }

       
        let streak = 0;
        let streakFlag = true;
        let counter = 0;
        let dateToCheck = latestVoting[0].currentDay;
        let lastWeekVotes = [];

        while (true) {
            // chequea si dateToCheck es fin de semana
            const date = new Date(dateToCheck);
            const day = date.getDay();
            const isWeekend = (day === 6) || (day === 0);
            let voting = '';

            if (!isWeekend) {
                voting = await votingModel.findOne({
                    where: {
                        idEmployee: decoded.idEmployee,
                        idCompany: decoded.idCompany,
                        currentDay: dateToCheck,
                    },
                });
            } else {
                // retrasa un día
                dateToCheck = new Date(dateToCheck);
                dateToCheck.setDate(dateToCheck.getDate() - 1);
                dateToCheck = dateToCheck.toISOString().slice(0, 10);
                continue;
            }

            if (!voting) {
                streakFlag = false;
            }
            
            if (streakFlag) {
                streak++;
            }

            if (counter === 5) {
                break;
            }

            // voting ? lastWeekVotes.push(1) : lastWeekVotes.push(0);
            // añade al array un objeto, donde la clave sea el día de la semana y el valor sea 1 si voting y 0 si no voting
            const daysOfWeekCaps = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
            if (voting) {
                lastWeekVotes.push({
                    [daysOfWeekCaps[day]]: 1,
                });
            } else {
                lastWeekVotes.push({
                    [daysOfWeekCaps[day]]: 0,
                });
            }

            counter++;

            dateToCheck = new Date(dateToCheck);
            dateToCheck.setDate(dateToCheck.getDate() - 1);
            dateToCheck = dateToCheck.toISOString().slice(0, 10);
        }
        res.status(200).json({
            idEmployee: decoded.idEmployee,
            email: decoded.email,
            name: decoded.name,
            lastName: decoded.lastName,
            dni: decoded.dni,
            workerId: decoded.workerId,
            idCompany: decoded.idCompany,
            companyName: userDetail[0].companyName,
            idDepartment: userDetail[0].idDepartment,
            departmentName: userDetail[0].departmentName,
            idBranch: userDetail[0].idBranch,
            branchName: userDetail[0].branchName,
            idShift: userDetail[0].idShift,
            shiftName: userDetail[0].shiftName,
            employeesCount: employeesCount[0].employeesCount,
            latestVoting: latestVoting,
            streak: streak,
            lastWeekVotes: lastWeekVotes,
            isAdmin: 'isAdmin',
        });
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
};

export default {
    login,
    logout,
    session,
    loginAdmin,
    logoutAdmin,
    sessionAdmin,
};
