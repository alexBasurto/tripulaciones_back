import "./Maintenance.css";
import { useState } from "react";
import Employees from "./Employees";
import Departments from "./Departments";
import Branches from "./Branches";
import Shifts from "./Shifts";

const Maintenance = () => {
    const [maintenance, setMaintenance] = useState("employees");

    return (
        <div className="maintenance">
            {maintenance === "employees" && <h1>Empleados</h1>}
            {maintenance === "departments" && <h1>Departamentos</h1>}
            {maintenance === "branches" && <h1>Sedes</h1>}
            {maintenance === "shifts" && <h1>Turnos</h1>}
            <div className="maintenance-buttons">
                <button onClick={() => setMaintenance("employees")}>
                    Empleados
                </button>
                <button onClick={() => setMaintenance("departments")}>
                    Departamentos
                </button>
                <button onClick={() => setMaintenance("branches")}>
                    Sedes
                </button>
                <button onClick={() => setMaintenance("shifts")}>
                    Turnos
                </button>
            </div>

            {maintenance === "employees" && <Employees />}
            {maintenance === "departments" && <Departments />}
            {maintenance === "branches" && <Branches />}
            {maintenance === "shifts" && <Shifts />}
        </div>
    );
}

export default Maintenance;
