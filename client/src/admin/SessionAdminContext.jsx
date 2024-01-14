import { useState, useContext, createContext, useEffect } from "react";
import { sessionApi } from "./utils/apiAdmin";

const SessionAdminContext = createContext();

const SessionAdminProvider = ({ children }) => {
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
        <SessionAdminContext.Provider value={{ session, setSession }}>
            {children}
        </SessionAdminContext.Provider>
    );
};

const useSession = () => useContext(SessionAdminContext);

export { SessionAdminProvider, useSession };
