import { useState, useEffect } from 'react';
import { getAllShifts, createShift, updateShift, deleteShift } from '../utils/apiMaintenance';

const Shifts = () => {
    const [crudState, setCrudState] = useState("table");
    const [readOrEditState, setReadOrEditState] = useState("read");
    const [shiftsData, setShiftsData] = useState([]);
    const [shiftToUpdate, setShiftToUpdate] = useState({});
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllShifts()
            .then(response => {
                setShiftsData(response);
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
                    <button onClick={() => setCrudState("create")} className="std-button">Agregar Turno</button>
                    {error && <div>{error}</div>}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shiftsData.map((shift) => (
                                <tr key={shift.idShift}>
                                    <td className='editdelete'>
                                        <button className='edit-delete-button' onClick={() => {
                                        setShiftToUpdate(shift);
                                        setCrudState("read");
                                    }}>
                                        <img src="/icons/editar.png" alt="Editar" />
                                        </button></td>
                                    <td className='editdelete'>
                                        <button className='edit-delete-button' onClick={() => {
                                        deleteShift(shift.idShift)
                                            .then(response => {
                                                console.log(response);
                                                setShiftsData(shiftsData.filter((item) => item.idShift !== shift.idShift));
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                setError('No se puede borrar el departamento.');
                                            }
                                            );
                                    }}>
                                        <img src="/icons/borrar.png" alt="Borrar" />
                                        </button></td>
                                    <td>{shift.name}</td>
                                    
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
                        setShiftToUpdate({});
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
                            updateShift(shiftToUpdate.idShift, data)
                                .then(response => {
                                    console.log(response);
                                    setShiftsData(shiftsData.map((item) => item.idShift === shiftToUpdate.idShift ? { ...item, ...data } : item));
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
                            <input type="text" name="name" id='name' defaultValue={shiftToUpdate.name} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        <label htmlFor='comments'>Comentarios
                            <input type="text" name="comments" id='comments' defaultValue={shiftToUpdate.comments} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        {readOrEditState === "edit" &&
                            <button type="submit" className="std-button">Guardar</button>
                        }
                    </form>
                    



                </div>
            }
            {crudState === "create" &&
                <div>
                    <h1>Crear turno</h1>
                    <button onClick={() => {
                        setCrudState("table");
                        setError("");
                        setShiftsData([]);
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
                            createShift(data)
                                .then(response => {
                                    console.log(response);
                                    setShiftsData([...shiftsData, response]);
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

export default Shifts;