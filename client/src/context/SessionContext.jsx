import { useState, useContext, createContext, useEffect } from 'react';
import { sessionApi } from '../utils/apiTripu';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState('not-started');

    useEffect(() => {
        const getSession = async () => {
            try {
                const response = await sessionApi();
                const data = await response.json();
                setSession(data);
            } catch (error) {
                setSession(null);
            }
        };
        getSession();
    }, []);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => useContext(SessionContext);

export { SessionProvider, useSession };
