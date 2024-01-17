import { useSession } from './SessionAdminContext';
import { logoutAdminApi } from './utils/apiAdmin';


const LogoutAdminButton = () => {
    const { session, setSession } = useSession();

    const handleLogout = () => {
        logoutAdminApi()
        .then(() => {
            setSession(null);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            {session && (
                <button onClick={handleLogout}>
                    Cerrar sesión
                </button>
            )}
        </>
    );
}

export default LogoutAdminButton;