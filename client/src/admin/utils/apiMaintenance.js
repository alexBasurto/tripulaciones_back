const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3020";

// Employees

const getAllEmployees = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/employees`, {
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

export { getAllEmployees, getEmployee, createEmployee };