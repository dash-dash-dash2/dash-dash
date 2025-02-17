import React, { useState,useEffect } from 'react';
import Navbar from "../navbar/page";
import Sidebar from "../sidebar/page";
import MainContent from "../Maincontent/page";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('home'); // State to track the selected menu item

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedMenuItem]);


  




  // Function to handle menu item clicks
  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    closeSidebar(); // Close the sidebar after selecting a menu item
  };

  return (
    <div className="min-h-screen bg-white text-[#03081F]">
      {/* <Navbar toggleSidebar={toggleSidebar} /> */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        onMenuItemClick={handleMenuItemClick} // Pass the callback to handle menu item clicks
      />
      <MainContent selectedMenuItem={selectedMenuItem} /> 
    </div>
  );
};

export default Dashboard;