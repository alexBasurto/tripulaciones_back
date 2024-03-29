const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST;

// Employees

const getAllEmployees = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/employees`, {
            method: "GET",
            credentials: "include",
        });
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const getEmployee = async (id) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/employees/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const createEmployee = async (employee) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/employees/new`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const updateEmployee = async (id, employee) => {
    try {
        console.log(employee);
        const response = await fetch(`${VITE_BACKEND_HOST}/employees/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/employees/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

// Departments
const getAllDepartments = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/departments`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const updateDepartment = async (id, department) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/departments/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(department),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const createDepartment = async (department) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/departments/new`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(department),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }

}

const deleteDepartment = async (id) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/departments/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;

    }
}

// Branches
const getAllBranches = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/branches`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const createBranch = async (branch) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/branches/new`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(branch),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`ERROR en la solicitud: ${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const updateBranch = async (id, branch) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/branches/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(branch),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`ERROR en la solicitud: ${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const deleteBranch = async (id) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/branches/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`ERROR en la solicitud: ${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}


// Shifts
const getAllShifts = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/shifts`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const createShift = async (shift) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/shifts/new`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shift),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`ERROR en la solicitud: ${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const updateShift = async (id, shift) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/shifts/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shift),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`ERROR en la solicitud: ${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

const deleteShift = async (id) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/shifts/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`ERROR en la solicitud: ${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}



export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getAllDepartments,
    getAllShifts,
    getAllBranches,
    updateDepartment,
    createDepartment,
    deleteDepartment,
    createBranch,
    updateBranch,
    deleteBranch,
    createShift,
    updateShift,
    deleteShift
};