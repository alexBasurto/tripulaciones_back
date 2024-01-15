import { useState } from "react";

import Employees from "./Employees";
import Departments from "./Departments";
import Branches from "./Branches";
import Shifts from "./Shifts";

const Maintenance = () => {
    const [maintenance, setMaintenance] = useState("employees");

    return (
        <div className="maintenance">
            <h1>Administración</h1>
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
