import { useSession } from '../context/SessionContext';
import { logoutApi } from '../utils/apiTripu';


function Header() {
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
        <header>
            <h1>Tripulaciones</h1>
            <nav>
                <ul>
                    {session && <button onClick={handleLogout}>Cerrar sesión</button>}
                </ul>
            </nav>
            {session && <p>Usuario logueado: {session.name} {session.lastName}</p>}
        </header>
    )
}

export default Header;