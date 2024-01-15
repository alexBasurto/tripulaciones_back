import { useState, useEffect } from "react";
import {
    getAllEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
} from "../utils/apiMaintenance";

const Employees = () => {
    const [crudState, setCrudState] = useState("table");
    const [employeesData, setEmployeesData] = useState([]);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        // Fetch employees
        getAllEmployees()
            .then((response) => {
                setEmployeesData(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [employeesData]);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setCurrentPageData(employeesData.slice(start, end));
        setTotalPages(Math.ceil(employeesData.length / itemsPerPage));
    }, [currentPage, employeesData]);
    

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const deleteRow = (id) => {
        deleteEmployee(id)
            .then((response) => {
                // alert en navegador
                alert(`Empleado con id ${id} eliminado`);
                setEmployeesData(employeesData.filter((employee) => employee.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container-maintenance-detail">
            <h1>Empleados</h1>
            {crudState === "table" && (
                <>
            <table className="tb-employees">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
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
                    {currentPageData.map((employee, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <button
                                        onClick={() => {
                                            getEmployee(employee.id);
                                        }}
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => { deleteRow(employee.idEmployee); }}>Eliminar</button>
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.comments}</td>
                                <td>{employee.departmentName}</td>
                                <td>{employee.shiftName}</td>
                                <td>{employee.branchName}</td>
                                <td>{employee.companyAdministrator === 1 ? 'SI' : 'NO'}</td>
                                <td>{employee.superAdministrator === 1 ? 'SI' : 'NO'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
            </>

            )}

        </div>
    );
};

export default Employees;
