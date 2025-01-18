import React from 'react';

const TradingForm = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Start Trading</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="stockSymbol" className="block text-gray-700 font-medium mb-2">Stock Symbol</label>
          <input
            id="stockSymbol"
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Trade Now
        </button>
      </form>
    </div>
  );
};

export default TradingForm;
