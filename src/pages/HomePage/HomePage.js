import React from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LanguageSwitch from '../../components/LanguageSwitch/LanguageSwitch';
import MenuDisplay from '../../components/MenuDisplay/MenuDisplay';
import EmployeeLogin from '../../components/EmployeeLogin/EmployeeLogin';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <LanguageSwitch />
      <MenuDisplay />
      <EmployeeLogin />
      <Footer />
    </div>
  );
};

export default HomePage;


