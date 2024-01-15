import './Login.css';
import { useState } from 'react';
import { loginApi, sessionApi } from '../utils/apiTripu';
import { useSession } from '../context/SessionContext';
import Footer from '../components/Footer';

function Login({ activeComponent, setActiveComponent }) {
    const { session, setSession } = useSession();
    const [workerId, setWorkerId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [shakeError, setShakeError] = useState(false);

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
            setShakeError(true); // Activa el temblor
            setTimeout(() => setShakeError(false), 500); // Desactiva el temblor después de 0.5 segundos
            return;
        }

        if (!validateInputs()) {
            setShakeError(true); // Activa el temblor si la validación falla
            setTimeout(() => setShakeError(false), 500); // Desactiva el temblor después de 0.5 segundos
            return;
        }

        setError(null);
        loginApi(workerId, password)
            .then(response => {
                if (!response.ok) {
                    setError('Usuario o contraseña incorrectos');
                    setShakeError(true); // Activa el temblor si la respuesta no es correcta
                    setTimeout(() => setShakeError(false), 500); // Desactiva el temblor después de 0.5 segundos
                    return;
                }

                // Llama a sessionApi y setea el session
                sessionApi()
                    .then(response => {
                        if (!response.ok) {
                            setError('Usuario o contraseña incorrectos');
                            setShakeError(true); // Activa el temblor si la respuesta no es correcta
                            setTimeout(() => setShakeError(false), 500); // Desactiva el temblor después de 0.5 segundos
                            return;
                        }
                        return response.json();
                    }).then(data => {
                        setSession(data);
                    }).catch(error => {
                        setError('Usuario o contraseña incorrectos');
                        setShakeError(true); // Activa el temblor en caso de error
                        setTimeout(() => setShakeError(false), 500); // Desactiva el temblor después de 0.5 segundos
                    });

                if (session && session.lastWeekVotes && sessionlastWeekVotes[0] === 1) {
                    setActiveComponent('ending');
                    return;
                } else {
                    setActiveComponent('preMood');
                }
            }).catch(error => {
                setError('Usuario o contraseña incorrectos');
                setShakeError(true); // Activa el temblor en caso de error en la petición
                setTimeout(() => setShakeError(false), 500); // Desactiva el temblor después de 0.5 segundos
            });
    }

    // Condition to check if both inputs are empty
    const isButtonDisabled = workerId === '';

    return (
        <>
            <main className="login-main">
                <img src="/logo-unscreen.gif" alt="Logo" className="app-logo" />
                <span className='login-text'>Comparte tus emociones, mejoremos juntos el entorno laboral</span>
                {!session &&
                    <div className={`login-form-container ${shakeError ? 'shake-animation' : ''}`}>
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
                                <Footer />
                            </div>
                        </form>
                    </div>
                }
            </main>
        </>
    );
}

export default Login;
