import React from 'react';

const TradingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Demo Trading. All rights reserved.</p>
        <nav className="space-x-4 mt-2">
          <a href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</a>
          <span>|</span>
          <a href="/terms-of-service" className="text-gray-300 hover:text-white">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};

export default TradingFooter;