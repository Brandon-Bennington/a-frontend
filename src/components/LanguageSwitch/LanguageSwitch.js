import React from 'react';
import './LanguageSwitch.css';

const LanguageSwitch = () => {
  const handleLanguageChange = (language) => {
    // Implement language switching logic here
    console.log(`Switching to ${language}`);
  };

  return (
    <div className="language-switch">
      <button onClick={() => handleLanguageChange('BR Portuguese')}>BR Portuguese</button>
      <button onClick={() => handleLanguageChange('English')}>English</button>
      <button onClick={() => handleLanguageChange('Spanish')}>Spanish</button>
    </div>
  );
};

export default LanguageSwitch;
