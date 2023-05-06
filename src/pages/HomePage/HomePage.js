import React, { useState, useEffect } from "react";
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
  const [setLoggedIn] = useState(false);



  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post(`http://localhost:5001/middleware/check-auth`, null, {
            headers: { Authorization: `Bearer ${token}` }
          });          
          if (response.status === 200) {
            setLoggedIn(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkLoginStatus();
  }, []);

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
        // set the loggedIn state to true
        setLoggedIn(true);
        localStorage.setItem('token', response.data.token); // Store the token in local storage
      }
    } catch (err) {
      setError(err.response.data.message);
      console.log(err.response);
    console.log(err.response.data);

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
              <button type="submit" className="btn btn-primary">Register</button>
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
              {error && <div className="error">{error}</div>}
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  
}

export default HomePage;



