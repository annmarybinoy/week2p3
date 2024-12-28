import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Signup.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';


const Signup = () => {
 const [email,setEmail] = useState('');
 const [username,setUsername] = useState('');
 const [password,setPassword] = useState('');
 const [error,setError] = useState('');
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const response = await fetch('http://localhost:5000/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,username,password}),
    });

    if(!response.ok){
      throw new Error('Signup failed');
    }

    navigate('/signin');
  } catch (error) {
    setError(error.message);
  }
}

  return (
    <div className="signup-container">
      <div className="logo-container">
        <FontAwesomeIcon icon={faSpotify} size="2x" color="#1DB954" />
      </div>
      <div>          
        <h1>Sign up to<br /> start listening</h1>
      </div>
      {error && <p className="error_message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit} >
        <input type="email" placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required/>
        <br></br>
        <input type="text" placeholder="username"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}/><br></br>
        <input type="password" placeholder="Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        required/>
        <br></br>
        
        <button type="submit">Sign Up</button>
        
      </form>
      <p>Already have an account ? <a href="#" onClick={() => navigate("/signin")}>Log in</a></p>
    </div>
  );
};

export default Signup;
