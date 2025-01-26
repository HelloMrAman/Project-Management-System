import React from 'react'
import LogoutButton from '../components/ui/LogoutButton';

const DashboardPage = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Other Navbar Elements */}
        <LogoutButton /> {/* Include the Logout Button */}
      </div>
    </header>
  );
}

export default DashboardPage