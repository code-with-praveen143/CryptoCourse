// Step 1: Implement UI components without direct usage of shadcn/ui

// File: app/demo-trading/components/DemoHeader.tsx
import React from 'react';

const DemoHeader = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Demo Trading</h1>
        <nav className="space-x-4">
          <a href="/learn" className="text-gray-300 hover:text-white">Learn</a>
          <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
          <a href="/about" className="text-gray-300 hover:text-white">About</a>
        </nav>
      </div>
    </header>
  );
};

export default DemoHeader;