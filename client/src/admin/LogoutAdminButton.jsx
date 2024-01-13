import { useSession } from '../context/SessionContext';
import { logoutApi } from './utils/apiAdmin.js';


const LogoutAdminButton = () => {
    const { session, setSession } = useSession();

    const handleLogout = () => {
        logoutApi()
        .then(() => {
            setSession(null);
        }).catch(error => {
            console.log(error);
        });
    }

    return (<>
    {session && <button style={
        {
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '30px',
            height: '30px',
            backgroundColor: 'red',
            opacity: '0.5',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
        }
    } onClick={handleLogout}>X</button>}
    </>);
}

export default LogoutAdminButton;