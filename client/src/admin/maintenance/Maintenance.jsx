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
                {maintenance !== "employees" && (
                    <button onClick={() => setMaintenance("employees")} className="std-button">
                        Empleados
                    </button>
                )}
                {maintenance !== "departments" && (
                    <button onClick={() => setMaintenance("departments")} className="std-button">
                        Departamentos
                    </button>
                )}
                {maintenance !== "branches" && (
                    <button onClick={() => setMaintenance("branches")} className="std-button">
                        Sedes
                    </button>
                )}
                {maintenance !== "shifts" && (
                    <button onClick={() => setMaintenance("shifts")} className="std-button">
                        Turnos
                    </button>
                )}
            </div>

            {maintenance === "employees" && <Employees />}
            {maintenance === "departments" && <Departments />}
            {maintenance === "branches" && <Branches />}
            {maintenance === "shifts" && <Shifts />}
        </div>
    );
}

export default Maintenance;
