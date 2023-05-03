import React from 'react';
import Header from '../../components/Header/Header';
import LanguageSwitch from '../../components/LanguageSwitch/LanguageSwitch';
import MenuDisplay from '../../components/MenuDisplay/MenuDisplay';
import Footer from '../../components/Footer/Footer';
import './CustomerPage.css';

const CustomerPage = () => {
  return (
    <div className="CustomerPage">
      <Header />
      <LanguageSwitch />
      <MenuDisplay />
      <Footer />
    </div>
  );
};

export default CustomerPage;

