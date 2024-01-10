import { useState, useContext, createContext, useEffect } from "react";
import { sessionApi, latestVotingApi } from "../utils/apiTripu";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState({ data: "not-started", lastVoting: null });

    // Use a separate state variable to track the need for fetching latest voting data
    const [fetchLatestVoting, setFetchLatestVoting] = useState(false);

    useEffect(() => {
        if (session.data === "not-started" || session.data === null) {
            const getSession = async () => {
                try {
                    const response = await sessionApi();
                    const data = await response.json();
                    if (data === null) {
                        setSession({ data: null, lastVoting: null });
                        return;
                    } else {
                        setSession((prevSession) => ({
                            ...prevSession,
                            data: data,
                        }));
                        setFetchLatestVoting(true); // Set this flag to fetch latest voting data
                    }
                
                } catch (error) {
                    setSession({ data: null, lastVoting: null });
                }
            };
            getSession();
        }
    }, [session.data]);

    useEffect(() => {
        // Fetch latest voting data when fetchLatestVoting flag is true
        if (fetchLatestVoting && session.data !== null && session.data !== "not-started") {
            const getLatestVoting = async () => {
                try {
                    const response = await latestVotingApi(
                        session.data.idEmployee,
                        session.data.idCompany
                    );
                    const data = await response.json();
                    setSession((prevSession) => ({
                        ...prevSession,
                        lastVoting: data,
                    }));
                } catch (error) {
                    console.log(error);
                }
            };
            getLatestVoting();
            // Reset the flag after fetching latest voting data
            setFetchLatestVoting(false);
        }
    }, [fetchLatestVoting, session.data]);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => useContext(SessionContext);

export { SessionProvider, useSession };
