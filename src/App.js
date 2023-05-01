import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import MenuDisplay from './components/MenuDisplay/MenuDisplay';
import Footer from './components/Footer/Footer';

function App() {
  const [language, setLanguage] = useState('pt');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="App">
      <Header />
      <LanguageSwitch onLanguageChange={handleLanguageChange} />
      <MenuDisplay language={language} />
      <Footer />
    </div>
  );
}

export default App;
