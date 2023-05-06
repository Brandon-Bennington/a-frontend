import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuManagement from './MenuManagement';

function EmployeeDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/menuItems');
        setMenuItems(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchMenuItems();
  }, []);

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleMenuItemCreate = async (menuItemData) => {
    try {
      const response = await axios.post('http://localhost:5001/api/menuItems', menuItemData);
      setMenuItems([...menuItems, response.data]);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleMenuItemUpdate = async (menuItemData) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/menuItems/${selectedMenuItem._id}`, menuItemData);
      const updatedMenuItem = response.data;
      setMenuItems(menuItems.map((menuItem) => (menuItem._id === updatedMenuItem._id ? updatedMenuItem : menuItem)));
      setSelectedMenuItem(null);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleMenuItemDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/menuItems/${selectedMenuItem._id}`);
      setMenuItems(menuItems.filter((menuItem) => menuItem._id !== selectedMenuItem._id));
      setSelectedMenuItem(null);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="EmployeeDashboard">
      <h1>Menu Management</h1>
      {error && <div className="error">{error}</div>}
      <div className="row">
        <div className="col-md-6">
          <MenuManagement
            menuItems={menuItems}
            selectedMenuItem={selectedMenuItem}
            onMenuItemSelect={handleMenuItemSelect}
            onMenuItemCreate={handleMenuItemCreate}
            onMenuItemUpdate={handleMenuItemUpdate}
            onMenuItemDelete={handleMenuItemDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
