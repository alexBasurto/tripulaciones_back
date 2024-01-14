const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3020";

const apiCharts = async (idCompany, chart) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/data`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idCompany, chart }), 
        });
        if (response.ok) {
            const data = await response.json();
            console.log("data", data);
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

export { apiCharts };