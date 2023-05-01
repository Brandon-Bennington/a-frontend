import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item, language }) => {
  const getTitle = () => {
    switch (language) {
      case 'en':
        return item.title_en;
      case 'es':
        return item.title_es;
      default:
        return item.title;
    }
  };

  return (
    <div className="menu-display-item">
      <h3>{getTitle()}</h3>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </div>
  );
};

export default MenuItem;
