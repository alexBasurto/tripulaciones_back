import { useState, useContext, createContext, useEffect } from "react";
import { sessionApi, latestVotingApi } from "../utils/apiTripu";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState({ data: "not-started", lastVoting: null });
    /* let latestVotingAgain = 0; */

    useEffect(() => {
        if (session.data === "not-started") {
        const getSession = async () => {
            try {
                const response = await sessionApi();
                const data = await response.json();
                setSession({ ...session, data: data });
/*                 latestVotingAgain++;
 */            } catch (error) {
                setSession({ data: null, lastVoting: null });
            }
        };
            getSession();
        }
    }, [session.data]);

    /* useEffect(() => {
        if (session.data !== null || session.data !== "not-started") {
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
        }
    }, [latestVotingAgain]); */

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => useContext(SessionContext);

export { SessionProvider, useSession };
