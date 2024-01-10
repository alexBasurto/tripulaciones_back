import { useSession } from '../context/SessionContext';
import { logoutApi } from '../utils/apiTripu';


function LogoutButton() {
    const { session, setSession } = useSession();

    const handleLogout = () => {
        logoutApi()
        .then(() => {
            setSession({ data: null, lastVoting: null });
        }).catch(error => {
            console.log(error);
        });
    }

    return (<>
    {session && <button onClick={handleLogout}>Cerrar sesión</button>}
    </>);
}

export default LogoutButton;