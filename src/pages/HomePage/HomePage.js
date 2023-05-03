import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MenuDisplay from "../../components/MenuDisplay/MenuDisplay";
import LanguageSwitch from "../../components/LanguageSwitch/LanguageSwitch";
import axios from "axios";
import "./HomePage.css";

function HomePage({ language, handleLanguageChange }) {
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', usertype: 'employee' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:5001/api/users/register`, registerForm);
    if (response.status === 201) {
      setError(null);
      setLoginForm({ username: registerForm.username, password: registerForm.password });
      setRegisterForm({ username: '', password: '', usertype: 'employee' });
    }
  } catch (err) {
    setError(err.response.data.message);
  }
};
  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/users/login`, loginForm);
      if (response.status === 200) {
        setError(null);
        // Redirect to the employee dashboard after successful login
        window.location.href = '/employee';
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleRegisterInputChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.id]: e.target.value });
  };
  const handleLoginInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };

  return (
    <>
    <div className="HomePage">
      <Header language={language} handleLanguageChange={handleLanguageChange} />
      <MenuDisplay language={language} />
      <LanguageSwitch language={language} handleLanguageChange={handleLanguageChange} />
      {/* Add the login and registration forms here */}
      {/* Registration form */}
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleRegisterSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={registerForm.username}
                onChange={handleRegisterInputChange}
                className="form-control" />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={registerForm.password}
                onChange={handleRegisterInputChange}
                className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>

        {/* Login form */}
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLoginSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={handleLoginInputChange}
                className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div><Footer />
    </>
  );
}

export default HomePage;


/*import React, { useState } from 'react';
import axios from 'axios';
import './HomePage.css';

function HomePage({ setLoggedIn }) {
  const [registerData, setRegisterData] = useState({ username: '', password: '', usertype: 'employee' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/register`, registerData);
      if (response.status === 201) {
        setError(null);
        setLoginData({ username: registerData.username, password: registerData.password });
        setRegisterData({ username: '', password: '', usertype: 'employee' });
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/login`, loginData);
      if (response.status === 200) {
        setError(null);
        setLoggedIn(true);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Home Page</h1>

      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleRegisterSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="registerUsername">Username</label>
              <input
                type="text"
                id="registerUsername"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword">Password</label>
              <input
                type="password"
                id="registerPassword"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLoginSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="loginUsername">Username</label>
              <input
                type="text"
                id="loginUsername"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
</div>
);
}

export default HomePage;
*/
