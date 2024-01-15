import { useState, useEffect } from "react";
import { getAllEmployees, getEmployee, createEmployee } from "../utils/apiMaintenance";

const Employees = () => {
    const [employeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        // Fetch employees
        getAllEmployees()
            .then(response => {
                console.log(response);
                setEmployeesData(response);
            })
            .catch(error => {
                console.log(error);
            });
        }, []);

    return (
        <div className="container-maintenance-detail">
            <h1>Empleados</h1>

            <table className="tb-employees">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Email</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Comentarios</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Campus</th>
                        <th scope="col">Administrador</th>
                        <th scope="col">Superadministrador</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesData.map((employee, index) => {
                        return (
                            <tr key={index}>
                                <td>{employee.name}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.dni}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.comments}</td>
                                <td>{employee.departmentName}</td>
                                <td>{employee.shiftName}</td>
                                <td>{employee.branchName}</td>
                                <td>{employee.companyAdministrator}</td>
                                <td>{employee.superAdministrator}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default Employees;