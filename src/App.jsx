import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context';
import Signup from './components/Signup';
import Signin from './components/Sigin';
import Home from './components/Home';
import './App.css';

function App() {
    const { token } = useContext(AuthContext);
    
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            {/* This will redirect to signup if no token is present */}
            <Route path="/" element={token ? <Home /> : <Navigate to="/signup" />} />
        </Routes>
    );
}

export default App;
