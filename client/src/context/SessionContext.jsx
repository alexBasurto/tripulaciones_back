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

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => useContext(SessionContext);

export { SessionProvider, useSession };
