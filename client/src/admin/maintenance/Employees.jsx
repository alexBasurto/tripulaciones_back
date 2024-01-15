import { useState, useEffect } from "react";
import {
    getAllEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getAllDepartments,
    getAllBranches,
    getAllShifts,
} from "../utils/apiMaintenance";

const Employees = () => {
    const [crudState, setCrudState] = useState("table");
    const [readOrEditState, setReadOrEditState] = useState("read");
    const [employeesData, setEmployeesData] = useState([]);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [employeeToUpdate, setEmployeeToRead] = useState({});
    const [departmentsList, setDepartmentsList] = useState([]);
    const [branchesList, setBranchesList] = useState([]);
    const [shiftsList, setShiftsList] = useState([]);
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

    const readRow = (employeeDetail) => {
        const getDeptBranchShift = () => {
            //Fetch departments, branches and shifts for use them in the form
            getAllDepartments()
                .then((response) => {
                    setDepartmentsList(response);
                    console.log(response);
                })
                .then(() => {
                    getAllBranches()
                        .then((response) => {
                            setBranchesList(response);
                            console.log(response);
                        })
                        .then(() => {
                            getAllShifts()
                                .then((response) => {
                                    setShiftsList(response);
                                    console.log(response);
                                    //Open update form

                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getDeptBranchShift();
        setEmployeeToRead(employeeDetail);
        setCrudState("read");
        setReadOrEditState("read");
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
                        <th scope="col">Apellidos</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Comentarios</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Campus</th>
                        <th scope="col">Administrador</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((employee, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <button onClick={() => { readRow(employee) }}>Ver</button>
                                </td>
                                <td>
                                    <button onClick={() => { deleteRow(employee.idEmployee); }}>Eliminar</button>
                                </td>
                                <td>{employee.lastName}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.comments}</td>
                                <td>{employee.departmentName}</td>
                                <td>{employee.shiftName}</td>
                                <td>{employee.branchName}</td>
                                <td>{employee.companyAdministrator === 1 ? 'SI' : 'NO'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
            </div>
            </>
            )}

            {crudState === "read" && (
                <>
                    <h2>Detalle de empleado</h2>
                    <button onClick={() => { setReadOrEditState('read') }}>Volver</button>
                    <button onClick={() => { setReadOrEditState('edit') }}>Editar</button>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            const data = Object.fromEntries(formData);
                            data.idEmployee = employeeToUpdate.idEmployee;
                            data.companyAdministrator = data.companyAdministrator === "true" ? 1 : 0;
                            data.superAdministrator = data.superAdministrator === "true" ? 1 : 0;
                            createEmployee(data)
                                .then((response) => {
                                    // alert en navegador
                                    alert(`Empleado con id ${response.idEmployee} actualizado`);
                                    setCrudState("table");
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                        }
                        >
                        <label htmlFor="lastName">
                            Apellidos
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                defaultValue={employeeToUpdate.lastName}
                                {...(readOrEditState === "read" && { disabled: true })}
                            />    
                        </label>

                        <label htmlFor="name">
                            Nombre
                            <input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={employeeToUpdate.name}
                                {...(readOrEditState === "read" && { disabled: true })}
                            />
                        </label>

                        <label htmlFor="email">
                            Email
                            <input
                                type="text"
                                name="email"
                                id="email"
                                defaultValue={employeeToUpdate.email}
                                {...(readOrEditState === "read" && { disabled: true })}
                            />
                        </label>

                        <label htmlFor="mobile">
                            Teléfono
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                defaultValue={employeeToUpdate.mobile}
                                {...(readOrEditState === "read" && { disabled: true })}
                            />
                        </label>

                        <label htmlFor="comments">
                            Comentarios
                            <input
                                type="text"
                                name="comments"
                                id="comments"
                                defaultValue={employeeToUpdate.comments}
                                {...(readOrEditState === "read" && { disabled: true })}
                            />
                        </label>

                        <label htmlFor="department">
                            Departamento
                            <select
                                name="department"
                                id="department"
                                defaultValue={employeeToUpdate.department}
                                {...(readOrEditState === "read" && { disabled: true })}
                            >
                                {departmentsList.map((department, index) => {
                                    return (
                                        <option key={index} value={department.idDepartment}>
                                            {department.name}
                                        </option>
                                    );
                                }
                                )}
                            </select>
                        </label>

                        <label htmlFor="branch">
                            Sede
                            <select
                                name="branch"
                                id="branch"
                                defaultValue={employeeToUpdate.branch}
                                {...(readOrEditState === "read" && { disabled: true })}
                            >
                                {branchesList.map((branch, index) => {
                                    return (
                                        <option key={index} value={branch.idBranch}>
                                            {branch.name}
                                        </option>
                                    );
                                }
                                )}
                            </select>
                        </label>

                        <label htmlFor="shift">
                            Turno
                            <select
                                name="shift"
                                id="shift"
                                defaultValue={employeeToUpdate.shift}
                                {...(readOrEditState === "read" && { disabled: true })}
                            >
                                {shiftsList.map((shift, index) => {
                                    return (
                                        <option key={index} value={shift.idShift}>
                                            {shift.name}
                                        </option>
                                    );
                                }
                                )}
                            </select>
                        </label>

                        <label htmlFor="companyAdministrator">
                            Administrador
                            {/* inputbox */}
                            <input
                                type="checkbox"
                                name="companyAdministrator"
                                id="companyAdministrator"
                                defaultChecked={employeeToUpdate.companyAdministrator === 1 ? true : false}
                                {...(readOrEditState === "read" && { disabled: true })}
                            />
                        </label>
                        
                        
                        {readOrEditState === "edit" && (
                            <button type="submit">Actualizar</button>
                        )}
                        </form>
                </>
                )}
        </div>
    );
};

export default Employees;
