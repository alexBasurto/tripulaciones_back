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
                <button 
                    onClick={handleLogout}
                    style={{
                        position: 'absolute', 
                        bottom: '10px', 
                        left: '45%', 
                        transform: 'translateX(-50%)', 
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '14px',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'center',
                        width: '70%'
                    }}
                >
                    Cerrar sesión
                </button>
            )}
        </>
    );
}

export default LogoutAdminButton;