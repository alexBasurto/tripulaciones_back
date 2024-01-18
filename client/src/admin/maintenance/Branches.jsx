import { useState, useEffect } from 'react';
import { getAllBranches, createBranch, updateBranch, deleteBranch } from '../utils/apiMaintenance';

const Branches = () => {
    const [crudState, setCrudState] = useState("table");
    const [readOrEditState, setReadOrEditState] = useState("read");
    const [branchesData, setBranchesData] = useState([]);
    const [branchToUpdate, setBranchToUpdate] = useState({});
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllBranches()
            .then(response => {
                setBranchesData(response);
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
                    <button onClick={() => setCrudState("create")} className="std-button">Agregar Sede</button>
                    {error && <div>{error}</div>}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Ciudad</th>
                                <th>País</th>
                                <th>Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branchesData.map((branch) => (
                                <tr key={branch.idBranch}>
                                    <td className='editdelete'>
                                        <button className='edit-delete-button' onClick={() => {
                                        console.log(branch);
                                        setBranchToUpdate(branch);
                                        setCrudState("read");
                                        setReadOrEditState("read");
                                    }}>
                                        <img src="/icons/editar.png" alt="Editar" />
                                        </button></td>
                                    <td className='editdelete'>
                                        <button className='edit-delete-button'onClick={() => {
                                        deleteBranch(branch.idBranch)
                                            .then(response => {
                                                console.log(response);
                                                setBranchesData(branchesData.filter((item) => item.idBranch !== branch.idBranch));
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                setError('No se puede borrar la sede.');
                                            }
                                            );
                                    }}>
                                        <img src="/icons/borrar.png" alt="Borrar" />
                                        </button></td>
                                    <td>{branch.name}</td>
                                    <td>{branch.address}</td>
                                    <td>{branch.city}</td>
                                    <td>{branch.country}</td>
                                    <td>{branch.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }

            {crudState === "create" &&
                <>
                    <h2>Crear Sede</h2>
                    <button onClick={() => {
                        setCrudState("table");
                        setBranchesData([]);
                        setLoad(!load);
                        setError("");
                    }
                    }
                    className="std-button"
                    >Volver al listado</button>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const data = Object.fromEntries(formData);
                        createBranch(data)
                            .then(response => {
                                console.log(response);
                                setBranchesData([...branchesData, response]);
                                setCrudState("table");
                            })
                            .catch(error => {
                                console.log(error);
                                setError('No se puede agregar la sede.');
                            }
                            );
                    }
                    }>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" required />
                        <label htmlFor="address">Dirección:</label>
                        <input type="text" id="address" name="address" required />
                        <label htmlFor="city">Ciudad:</label>
                        <input type="text" id="city" name="city" required />
                        <label htmlFor="country">País:</label>
                        <input type="text" id="country" name="country" required />
                        <label htmlFor="comments">Comentarios:</label>
                        <input type="text" id="comments" name="comments" />
                        <button type="submit" className="std-button">Agregar</button>
                    </form>
                </>
            }

            {crudState === "read" &&
                <div>
                    <h1>Detalles de la sede</h1>
                    <button onClick={() => {
                        setCrudState("table");
                        setError("");
                        setBranchToUpdate({});
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
                            updateBranch(branchToUpdate.idBranch, data)
                                .then(response => {
                                    console.log(response);
                                    setBranchesData(branchesData.map((item) => item.idBranch === branchToUpdate.idBranch ? { ...item, ...data } : item));
                                    setReadOrEditState("read");
                                })
                                .catch(error => {
                                    console.log(error);
                                    setError('No se puede actualizar la sede.');
                                }
                                );
                            setCrudState("table");
                        }}
                    >
                        <label htmlFor='name'>Nombre
                            <input type="text" name="name" id='name' defaultValue={branchToUpdate.name} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        <label htmlFor='address'>Dirección
                            <input type="text" name="address" id='address' defaultValue={branchToUpdate.address} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        <label htmlFor='city'>Ciudad
                            <input type="text" name="city" id='city' defaultValue={branchToUpdate.city} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        <label htmlFor='country'>País
                            <input type="text" name="country" id='country' defaultValue={branchToUpdate.country} {...(readOrEditState === "read" && { disabled: true })} />
                        </label>
                        <label htmlFor='comments'>Comentarios
                            <input
                                type="text"
                                name="comments"
                                id='comments'
                                defaultValue={branchToUpdate.comments}
                                {...(readOrEditState === "read" && { disabled: true })}
                            />
                        </label>
                        {readOrEditState === "edit" &&
                            <button type="submit" className="std-button">Guardar</button>
                        }
                    </form>
                </div>
            }

        </div>
    );
}

export default Branches;