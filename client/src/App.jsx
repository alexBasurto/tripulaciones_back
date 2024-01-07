import './App.css';
import Login from './pages/Login';
import { SessionProvider } from './context/SessionContext';

const App = () => {
  

 
  return (
    <div className="app">
      <SessionProvider>
        <Login />
      </SessionProvider>
    </div>
  );
};

export default App;
