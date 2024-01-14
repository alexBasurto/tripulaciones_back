import { useState } from 'react';
import { loginApi, sessionApi } from './utils/apiAdmin';
import { useSession } from './SessionAdminContext';
import Footer from '../components/Footer';

function LoginAdmin({ activeComponent, setActiveComponent }) {
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
                if (!response.ok) {
                    setError('Usuario o contraseña incorrectos');
                    return;
                }

                // llamar a sessionApi y setear el session
                sessionApi()
                    .then(response => {
                        if (!response.ok) {
                            setError('Usuario o contraseña incorrectos');
                            return;
                        }
                        return response.json();
                    }).then(data => {
                        setSession(data);
                        
                    }).catch(error => {
                        setError('Usuario o contraseña incorrectos', error);
                    });
            }).catch(error => {
                setError('Usuario o contraseña incorrectos', error);
            });
    }

    // Condition to check if both inputs are empty
    const isButtonDisabled = workerId === '' && password === '';

    return (
        <>
            <main className="login-main">
                <h2 className="login-title">Panel Admin RRHH <img src="/logo.gif" alt="Logo" className="app-logo" /></h2>
                <span className='login-text'>Frase de para que sirve esta webapp motivadora :/</span>

                    <div className="login-form-container">
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSumbit} onReset={() => {
                            setWorkerId('');
                            setPassword('');
                        }}>
                            <div className="form-group">
                                <label htmlFor="workerId">ID del trabajador</label>
                                <input type="text" id="workerId" name="workerId" value={workerId} onChange={(e) => setWorkerId(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña:</label>
                                <div className='password-input-container'>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='--------'
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button className='btn-iniciar' type="submit" disabled={isButtonDisabled}>Iniciar sesión</button>
                            </div>
                        </form>
                    </div>

                <Footer />
            </main>
        </>
    );
}

export default LoginAdmin;
