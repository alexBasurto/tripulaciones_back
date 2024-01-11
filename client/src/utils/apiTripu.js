const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3020";

const loginApi = async (workerId, password) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/login`, {
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

const logoutApi = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/logout`, {
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

const sessionApi = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/session`, {
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

const latestVotingApi = async (idEmployee, idCompany) => {
    try {
        console.log("idEmployee", idEmployee);
        console.log("idCompany", idCompany);
        //LLAMADA POST A LA API
        const response = await fetch(`${VITE_BACKEND_HOST}/voting/user/recent`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idEmployee, idCompany }),
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
}

const createVoteApi = async (idEmployee, idCompany, previousDay, previousDayScore, currentDay, currentDayScore) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/voting/user/new`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idEmployee, idCompany, previousDay, previousDayScore, currentDay, currentDayScore }),
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
}

const createVoteReasonApi = async (idVoting, idReason) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/voting/user/reasons`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idVoting, idReason }),
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
}

const createVoteFeelingApi = async (idVoting, idFeeling) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/voting/user/feelings`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idVoting, idFeeling }),
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
}

export {
    loginApi,  
    logoutApi,
    sessionApi,
    latestVotingApi,
    createVoteApi,
    createVoteReasonApi,
    createVoteFeelingApi,
  };
