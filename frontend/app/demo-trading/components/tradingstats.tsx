import React from 'react';

const TradingStats = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Trading Statistics</h2>
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-medium">Total Trades</td>
            <td className="border border-gray-300 px-4 py-2">150</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-medium">Successful Trades</td>
            <td className="border border-gray-300 px-4 py-2">142</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-medium">Profit Margin</td>
            <td className="border border-gray-300 px-4 py-2">8.7%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TradingStats;