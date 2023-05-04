import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeDashboard.css';
import MenuManagement from './MenuManagement';


function EmployeeDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
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
        setLoggedIn(true);
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

const menuManagementInterface = (
  <div>
    <h2>Menu Management</h2>
    <MenuManagement />
  </div>
);

  return (
    <div className="container">
      <h1 className="text-center mt-5">Employee Dashboard</h1>
      {!loggedIn ? (
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
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={registerForm.password}
                  onChange={handleRegisterInputChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
      
      </div>
    </div>
  ) : (
    <div>{menuManagementInterface}</div>
  )}
  {error && <div className="error">{error}</div>}
</div>
               
);
}

export default EmployeeDashboard;