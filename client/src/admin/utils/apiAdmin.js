const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3020";

const loginAdminApi = async (workerId, password) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/loginAdmin`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ workerId, password }),
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
};

const logoutAdminApi = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/logoutAdmin`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
};

const sessionAdminApi = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/sessionAdmin`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            return response;
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
export { loginAdminApi, logoutAdminApi, sessionAdminApi };