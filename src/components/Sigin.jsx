import React, {useState, useContext} from 'react'
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Signin.css'
const Sigin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error('Sign in failed');
      }
      const data = await res.json();
      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="login-container">
      <div className="logo-container">
              <FontAwesomeIcon icon={faSpotify} size="2x" color="#1DB954" />
            </div>
            <div>
              <h1>Log in to spotify</h1>
            </div>
            {error && <p className="error_message">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit} >
              <p>email id</p>
        <input type="email" placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required/><br></br>
        <p>password</p>
        <input type="password" placeholder="Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        required/><br></br>
        <button type="submit">Log in</button>
      </form>
      <p>
        <a href="#" onClick={() => navigate("/forgot-password")}>
          Forgot Your Password?
        </a>
      </p>
      <p>don't have an account ? <a href="#" onClick={() => navigate("/Signup")}>sign up for spotify</a></p>

    
    </div>
  )
}

export default Sigin
