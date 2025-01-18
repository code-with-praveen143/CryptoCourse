import React from 'react';
import DemoHeader from './components/demoheader';
import TradingForm from './components/tradingform';
import TradingStats from './components/tradingstats';
import TradingFooter from './components/tradingfooter';

export default function DemoTradingPage() {
  return (
    <div>
      <DemoHeader />
      <TradingForm />
      <TradingStats />
      <TradingFooter />
    </div>
  );
}
