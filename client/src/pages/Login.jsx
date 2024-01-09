import './Login.css';
import { useState } from 'react';
import { loginApi } from '../utils/apiTripu';
import { useSession } from '../context/SessionContext';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Login({activeComponent, setActiveComponent}) {
    const { session, setSession } = useSession();
    const [workerId, setWorkerId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const validateInputs = () => {
        // Validación de WORKER ID
        let errorsAccumulated = '';
        const workerIdRegex = /^[a-zA-Z0-9]{3,15}$/;
        
        if (!workerIdRegex.test(workerId)) {
        errorsAccumulated += 'El usuario debe tener mínimo 3 caracteres y máximo 15.';
        }

        // Validación de contraseña
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        if (!passwordRegex.test(password)) {
        errorsAccumulated += 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número. ';
        }

        if (errorsAccumulated !== '') {
        setError(errorsAccumulated);
        return false;
        }

        return true;
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if (workerId === '' || password === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (!validateInputs()) {
            return;
        }
        setError(null);
        loginApi(workerId, password)
        .then(response => {
            setSession(response);
            setActiveComponent('preMood');
        }).catch(error => {
            setError('Usuario o contraseña incorrectos', error);
        });            
    }

    return (
        <>
        <Header />
        <main className="login-main">
            <h2 className="login-title">Bienvenido a <img src="/logo.gif" alt="Logo" className="app-logo" /></h2>
            {session && !error && <p className="login-success">Usuario logueado correctamente</p>}
            {!session &&
            <div className="login-form-container">
                <p className="login-instructions">Introduce tus datos para iniciar sesión</p>

                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSumbit} onReset={() => {
                    setWorkerId('');
                    setPassword('');
                }}>
                    <div className="form-group">
                        <label htmlFor="workerId">ID de usuario</label>
                        <input type="text" id="workerId" name="workerId" value={workerId} onChange={(e) => setWorkerId(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-actions">
                        <button type="submit">Iniciar sesión</button>
                    </div>
                </form>
            </div>
            }
        </main>
        <Footer />
        </>
    );
}

export default Login;