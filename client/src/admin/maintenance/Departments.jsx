import { useState, useEffect } from 'react';
import { getAllDepartments } from '../utils/apiMaintenance';

const Departments = () => {

    const [departmentsData, setDepartmentsData] = useState([]);

    useEffect(() => {
        getAllDepartments()
            .then(response => {
                console.log(response);
                setDepartmentsData(response)
                
            })
            .catch(err => console.log(err));
    }
        , []);


    return (
        <div className="container-maintenance-detail">
            <h1>Departmentos</h1>
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
                            <td><button>Eliminar</button></td>
                            <td>{department.idDepartment}</td>
                            <td>{department.name}</td>
                            <td>{department.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
}

export default Departments;