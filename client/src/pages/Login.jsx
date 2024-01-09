import { useState } from 'react';
import { loginApi } from '../utils/apiTripu';
import { useSession } from '../context/SessionContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login({activeComponent, setActiveComponent}) {
    const { session, setSession } = useSession();
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const validateInputs = () => {
        // Validación de DNI
        let errorsAccumulated = '';
        const dniRegex =  /^\d{8}[a-zA-Z]$/;

        if (!dniRegex.test(dni)) {
        errorsAccumulated += 'El formato del DNI no es válido. ';
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
        if (dni === '' || password === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (!validateInputs()) {
            return;
        }
        setError(null);
        loginApi(dni, password)
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
        <main>
            <h2>Login</h2>
            {session && !error && <p>Usuario logueado correctamente</p>}
            {!session &&
            <>
            <p>Introduce tus datos para iniciar sesión</p>

            {error && <p>{error}</p>}
            <form action="post" onSubmit={handleSumbit} onReset={() => {
                setDni('');
                setPassword('');
                }
            }>
                <div>
                    <label>
                    DNI:
                    <input type="text" name="dni" value={dni} onChange={(e) => setDni(e.target.value)}/>
                    </label>
                </div>

                <div>
                    <label>
                    Contraseña:
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>

                <div>
                    <button type="submit">Iniciar sesión</button>
                </div>
                <div>
                    <button type="reset" value="Restablecer">Restablecer</button>
                </div>
            </form>
            </>
            }
        </main>
        <Footer />
        </>


    );
    }

export default Login;