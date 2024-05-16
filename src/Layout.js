// Layout.js

import React from 'react';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Import CSS file


function Layout() {
  return (
    
      <div className="layout-container">
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <Footer className="footer"/>
      </div>
  );
}

export default Layout;
