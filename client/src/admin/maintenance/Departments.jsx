import './Maintenance.css'
import { useState, useEffect } from 'react';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../utils/apiMaintenance';

const Departments = () => {
    const [crudState, setCrudState] = useState("table");
    const [readOrEditState, setReadOrEditState] = useState("read");
    const [departmentsData, setDepartmentsData] = useState([]);
    const [departmentToUpdate, setDepartmentToUpdate] = useState({});
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllDepartments()
            .then(response => {
                setDepartmentsData(response);
                setLoading(true);
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
            
            {crudState === "table" && loading &&
                <>
                    <button onClick={() => setCrudState("create")} className="std-button">Agregar Departamento</button>
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
                                        <button className='edit-delete-button' onClick={() => {
                                        setDepartmentToUpdate(department);
                                        setCrudState("read");
                                    }}><img src="/icons/editar.png" alt="Editar" /></button></td>
                                    <td className='editdelete'>
                                        <button className='edit-delete-button' onClick={() => {
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
                                    }}>
                                        <img src="/icons/borrar.png" alt="Borrar" />
                                        </button></td>
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
                    }
                    className="std-button"
                    >Volver al listado</button>
                    {readOrEditState === "read" &&
                    <button onClick={() => setReadOrEditState("edit")} className="std-button">Editar</button>
                    }
                    {readOrEditState === "edit" &&
                    <button onClick={() => setReadOrEditState("read")} className="std-button">Cancelar</button>
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
                            <button type="submit" className="std-button">Guardar</button>
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
                    }
                    className="std-button"
                    >Volver al listado</button>
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
                        <button type="submit" className="std-button">Guardar</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default Departments;