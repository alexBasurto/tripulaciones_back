import './App.css';
import Login from './pages/Login';
import { SessionProvider } from './context/SessionContext';

const App = () => {
  

 
  return (
    <div className="app">
      <SessionProvider>
        <h1>React App</h1>
        <Login />
      </SessionProvider>
    </div>
  );
};

export default App;
