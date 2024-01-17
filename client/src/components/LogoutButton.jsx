import { useSession } from '../context/SessionContext';
import { logoutApi } from '../utils/apiTripu';


const LogoutButton = () => {
    const { session, setSession } = useSession();

    const handleLogout = () => {
        logoutApi()
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
                    style={{
                        position: 'fixed', // Ubicado respecto a la ventana
                        bottom: '10px',    // Posicionado en la parte inferior
                        left: '50%',       // Centrado horizontalmente
                        transform: 'translateX(-50%)',
                        color: '#0F004C',
                        fontSize: '14px',  
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        border: 'none', 
                        background: 'none', 
                        cursor: 'pointer', 
                        padding: '10px 20px',
                    }}
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            )}
        </>
    );
}

export default LogoutButton;

