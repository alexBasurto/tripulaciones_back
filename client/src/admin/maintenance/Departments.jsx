import './Maintenance.css'
import { useState, useEffect } from 'react';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../utils/apiMaintenance';

const Departments = () => {
    const [crudState, setCrudState] = useState("table");
    const [readOrEditState, setReadOrEditState] = useState("read");
    const [departmentsData, setDepartmentsData] = useState([]);
    const [departmentToUpdate, setDepartmentToUpdate] = useState({});
    const [load, setLoad] = useState(false);
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
        , [load]);


    return (
        <div className="container-maintenance-detail">
            
            {crudState === "table" &&
                <>
                    <button onClick={() => setCrudState("create")}>Agregar Departamento</button>
                    {error && <div>{error}</div>}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Nombre</th>
                                <th>Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentsData.map((department) => (
                                <tr key={department.idDepartment}>
                                    <td className='editdelete'>
                                        <button className='edit-button' onClick={() => {
                                        setDepartmentToUpdate(department);
                                        setCrudState("read");
                                    }}>Ver</button></td>
                                    <td className='editdelete'>
                                        <button className='delete-button' onClick={() => {
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
                                    <td>{department.name}</td>
                                    <td>{department.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
            {crudState === "read" &&
                <div>
                    <h1>Detalles del departamento</h1>
                    <button onClick={() => {
                        setCrudState("table");
                        setError("");
                        setDepartmentToUpdate({});
                    }
                    }>Volver al listado</button>
                    {readOrEditState === "read" &&
                    <button onClick={() => setReadOrEditState("edit")}>Editar</button>
                    }
                    {readOrEditState === "edit" &&
                    <button onClick={() => setReadOrEditState("read")}>Cancelar</button>
                    }
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            const data = Object.fromEntries(formData);
                            console.log(data);
                            updateDepartment(departmentToUpdate.idDepartment, data)
                                .then(response => {
                                    console.log(response);
                                    setDepartmentsData(departmentsData.map((item) => item.idDepartment === departmentToUpdate.idDepartment ? { ...item, ...data } : item));
                                    setReadOrEditState("read");
                                })
                                .catch(error => {
                                    console.log(error);
                                    setError('No se puede actualizar el departamento.');
                                }
                                );
                            setCrudState("table");
                        }}
                    >
                        <label htmlFor='name'>Nombre
                            <input type="text" name="name" id='name' defaultValue={departmentToUpdate.name} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        <label htmlFor='comments'>Comentarios
                            <input type="text" name="comments" id='comments' defaultValue={departmentToUpdate.comments} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        {readOrEditState === "edit" &&
                            <button type="submit">Guardar</button>
                        }
                    </form>
                    



                </div>
            }
            {crudState === "create" &&
                <div>
                    <h1>Crear departamento</h1>
                    <button onClick={() => {
                        setCrudState("table");
                        setError("");
                        setDepartmentsData([]);
                        setLoad(!load);
                    }
                    }>Volver al listado</button>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            const data = Object.fromEntries(formData);
                            console.log(data);
                            createDepartment(data)
                                .then(response => {
                                    console.log(response);
                                    setDepartmentsData([...departmentsData, response]);
                                })
                                .catch(error => {
                                    console.log(error);
                                    setError('No se puede crear el departamento.');
                                }
                                );
                            setCrudState("table");
                        }}
                    >
                        <label htmlFor='name'>Nombre
                            <input type="text" name="name" id='name' />
                        </label>
                        <label htmlFor='comments'>Comentarios
                            <input type="text" name="comments" id='comments' />
                        </label>
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default Departments;