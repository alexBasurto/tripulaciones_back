import { useState, useEffect } from 'react';
import { getAllShifts, createShift, updateShift, deleteShift } from '../utils/apiMaintenance';

const Shifts = () => {
    const [crudState, setCrudState] = useState("table");
    const [readOrEditState, setReadOrEditState] = useState("read");
    const [shiftsData, setShiftsData] = useState([]);
    const [shiftToUpdate, setShiftToUpdate] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        getAllShifts()
            .then(response => {
                console.log(response);
                setShiftsData(response);

                
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
            <h1>Turnos</h1>
            {crudState === "table" &&
                <>
                    <button onClick={() => setCrudState("create")}>Agregar Turno</button>
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
                            {shiftsData.map((shift) => (
                                <tr key={shift.idShift}>
                                    <td><button onClick={() => {
                                        setShiftToUpdate(shift);
                                        setCrudState("read");
                                    }}>Ver</button></td>
                                    <td><button onClick={() => {
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
                                    }}>Eliminar</button></td>
                                    <td>{shift.name}</td>
                                    <td>{shift.comments}</td>
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
                        setShiftsData([]);
                    }
                    }>Volver al listado</button>
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
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default Shifts;