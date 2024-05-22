import React from 'react';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Import CSS file

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
