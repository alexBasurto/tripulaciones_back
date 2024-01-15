import { useState, useEffect } from 'react';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../utils/apiMaintenance';

const Departments = () => {
    const [crudState, setCrudState] = useState("table");
    const [departmentsData, setDepartmentsData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllDepartments()
            .then(response => {
                console.log(response);
                setDepartmentsData(response);

                
            })
            .catch(error => {
                console.log(error);
                setError("Error al obtener los datos");
            }
            );
    }
        , []);


    return (
        <div className="container-maintenance-detail">
            <h1>Departmentos</h1>
            {crudState === "table" &&
                <>
                    <button onClick={() => setCrudState("create")}>Agregar Departamento</button>
                    {error && <div>{error}</div>}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentsData.map((department) => (
                                <tr key={department.idDepartment}>
                                    <td><button>Editar</button></td>
                                    <td><button onClick={() => {
                                        deleteDepartment(department.idDepartment)
                                            .then(response => {
                                                console.log(response);
                                                setDepartmentsData(departmentsData.filter((item) => item.idDepartment !== department.idDepartment));
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                setError('No se puede borrar el departamento.');
                                            }
                                            );
                                    }}>Eliminar</button></td>
                                    <td>{department.idDepartment}</td>
                                    <td>{department.name}</td>
                                    <td>{department.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
            {crudState === "edit" &&
                <div>
                    <h1>Editar</h1>
                </div>
            }
            {crudState === "create" &&
                <div>
                    <h1>Agregar</h1>
                </div>
            }
        </div>
    );
}

export default Departments;