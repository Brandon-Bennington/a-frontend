import React, { useState, useEffect } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import './MenuDisplay.css';

const MenuDisplay = ({ language }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from the backend and set the state
    // Replace the URL with the URL of your backend
    fetch('http://localhost:5001/api/menuItems')
      .then((response) => response.json())
      .then((data) => setMenuItems(data));
  }, []);

  return (
    <div className="menu-display">
      {menuItems.map((item) => (
        <MenuItem key={item._id} item={item} language={language} />
      ))}
    </div>
  );
};

export default MenuDisplay;
