// Frontend: React Component
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  BTC_logo,
  ETH_logo,
  USDT_logo,
  XRP_logo,
  BCH_logo,
  BSV_logo,
  LTC_logo,
  BNB_logo,
  EOS_logo,
  XTZ_logo,
} from "../../../../public/img";
import { BASE_URL } from "@/app/utils/constants";

// Dynamically import TradingView widget
const AdvancedRealTimeChart = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  { ssr: false }
);

const Coin = () => {
  const { title } = useParams();
  const coin = Array.isArray(title) ? title[0] : title; // Get the coin name from the URL

  const [currentUSD, setCurrentUSD] = useState(0);
  const [currentCoin, setCurrentCoin] = useState(0);
  console.log("currentUSD", currentCoin);
  const [price, setPrice] = useState(0);
  const [changeH, setChangeH] = useState(0);
  const [changeD, setChangeD] = useState(0);
  const [changeW, setChangeW] = useState(0);
  const [logo, setLogo] = useState("");
  const [text, setText] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const coinLogos = {
    bitcoin: BTC_logo,
    ethereum: ETH_logo,
    tether: USDT_logo,
    xrp: XRP_logo,
    bitcoinCash: BCH_logo,
    bitcoinSV: BSV_logo,
    litecoin: LTC_logo,
    binancecoin: BNB_logo,
    eos: EOS_logo,
    tezos: XTZ_logo,
  };

  const fetchCoinData = async () => {
    if (!coin) return;

    try {
      const priceResponse = await fetch(
        `${BASE_URL}/exchange/coin-price/${coin}`
      );
      const priceData = await priceResponse.json();
      setPrice(parseFloat(priceData.price));

      const infoResponse = await fetch(
        `${BASE_URL}/exchange/coin-info/${coin}`
      );
      const infoData = await infoResponse.json();
      setText(infoData.description);
      setChangeH(infoData.percent_change_24h);
      setChangeD(infoData.percent_change_1h);
      setChangeW(infoData.percent_change_7d);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ username: localStorage.getItem("username") }),
      });
      const data = await response.json();
      setCurrentUSD(data.balance);
      setCurrentCoin(coin ? data[coin] || 0 : 0);
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  };

  const handleBuy = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          coin,
          value: parseFloat(buyAmount),
        }),
      });

      if (response.ok) {
        await fetchBalance();
        const responseData = await response.json();
        console.log("Buy Successful", responseData);
      } else {
        console.error("Buy action failed");
      }
    } catch (error) {
      console.error("Error handling buy action:", error);
    }
  };

  const handleSell = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          coin,
          value: sellAmount,
          coinsSold: currentCoin
        }),
      });
  
      if (response.ok) {
        await fetchBalance();
        const responseData = await response.json();
        console.log("Sell Successful", responseData);
      } else {
        const errorResponse = await response.json();
        console.error("Sell action failed:", errorResponse.message);
      }
    } catch (error) {
      console.error("Error handling sell action:", error);
    }
  };
  

  useEffect(() => {
    if (!coin) return;
    fetchCoinData();
    fetchBalance();
    setLogo(coinLogos[coin?.toLowerCase()] || "");
  }, [coin]);

  return (
    <div className="bg-[#ffffff] min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-white mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Real-Time Trading Chart</h3>
          <div className="w-full h-96">
            <AdvancedRealTimeChart
              theme="dark"
              autosize
              symbol={coin?.toUpperCase()}
              timezone="Europe/Berlin"
              locale="de_DE"
              toolbar_bg="#f1f3f6"
              hide_top_toolbar
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-white">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <Image src={logo} alt={`${coin} logo`} width={80} height={80} />
            </div>
            <div className="sm:ml-4 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{coin?.toUpperCase()}</h2>
            </div>
          </div>

          <div className="border border-gray-700 rounded-md p-4 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-center">{coin?.toUpperCase()} in Your Portfolio</h3>
            <div className="flex justify-between text-lg">
              <div>{currentCoin.toFixed(5)}x</div>
              <div>${(currentCoin * price).toFixed(2)}</div>
            </div>
          </div>

          <div className="border border-gray-700 rounded-md p-4 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Performance</h3>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Change Hour</span>
                <span className={changeH >= 0 ? "text-green-500" : "text-red-500"}>{changeH}%</span>
              </div>
              <div className="flex justify-between">
                <span>Change Day</span>
                <span className={changeD >= 0 ? "text-green-500" : "text-red-500"}>{changeD}%</span>
              </div>
              <div className="flex justify-between">
                <span>Change Week</span>
                <span className={changeW >= 0 ? "text-green-500" : "text-red-500"}>{changeW}%</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-700 rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4 text-center">Current Price</h3>
            <div className="text-center text-2xl font-bold text-green-500 mb-6">${price}</div>
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="number"
                placeholder={`Amount ${coin?.toUpperCase()}`}
                className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price USD"
                className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="w-full sm:w-auto p-3 bg-green-600 rounded text-white"
                onClick={handleBuy}
              >
                Buy
              </button>
              <button
                className="w-full sm:w-auto p-3 bg-red-600 rounded text-white"
                onClick={handleSell}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
