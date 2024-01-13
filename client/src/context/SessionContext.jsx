import { useState, useContext, createContext, useEffect } from "react";
import { sessionApi } from "../utils/apiTripu";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (session === null) {
            const getSession = async () => {
                try {
                    const response = await sessionApi();
                    const data = await response.json();
                    if (data === null) {
                        // setSession(null);
                        return;
                    } else {
                        setSession(data);
                    }
                
                } catch (error) {
                    return;
                }
            };
            getSession();
        }
    }, []);

    /* useEffect(() => {
        // Fetch latest voting data when fetchLatestVoting flag is true
        if (fetchLatestVoting && session.data !== null && session.data !== "not-started") {
            const getLatestVoting = async () => {
                try {
                    const response = await latestVotingApi(
                        session.data.idEmployee,
                        session.data.idCompany
                    );
                    const data = await response.json();
                    // haz setSession con el ultimo voto, añadiendolo a la información que ya tiene
                    setSession((prevSession) => ({
                        ...prevSession,
                        lastVoting: data,
                    }));
                    console.log('hecho2', data);
                } catch (error) {
                    console.log(error);
                }
            };
            getLatestVoting();
            // Reset the flag after fetching latest voting data
            setFetchLatestVoting(false);
        }
    }, [fetchLatestVoting, session.data]); */

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => useContext(SessionContext);

export { SessionProvider, useSession };
