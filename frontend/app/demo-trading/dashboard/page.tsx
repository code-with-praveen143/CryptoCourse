// Frontend component
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PieChart } from "react-minimal-pie-chart";
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  ListGroup,
  Card,
} from "react-bootstrap";
import {
  Logo,
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
} from "../../../public/img";
import Image from "next/image";
import { BASE_URL } from "@/app/utils/constants";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "Guest", email: "" });
  useEffect(() => {
    // Fetch user details from localStorage
    const username = localStorage.getItem("username") || "Guest";
    const email = localStorage.getItem("email") || "";
    setUser({ username, email });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser({ username: "Guest", email: "" });
    router.push("/login");
  };
  const [currentUser, setCurrentUser] = useState(null);
  const [portfolio, setPortfolio] = useState([
    { title: "USDollar", key: "$", value: 0, color: "#CBD4C6" },
    { title: "Bitcoin", key: "BTC", value: 0, color: "#F18F1B" },
    { title: "Ethereum", key: "ETH", value: 0, color: "#62688f" },
    { title: "Tether", key: "USDT", value: 0, color: "#53ae94" },
    { title: "XRP", key: "XRP", value: 0, color: "#292f4d" },
    { title: "BitcoinCash", key: "BCH", value: 0, color: "#f7941d" },
    { title: "BitcoinSV", key: "BSV", value: 0, color: "#eab301" },
    { title: "Litecoin", key: "LTC", value: 0, color: "#bebebe" },
    { title: "Binancecoin", key: "BNB", value: 0, color: "#f3ba30" },
    { title: "EOS", key: "EOS", value: 0, color: "#ffffff" },
    { title: "Tezos", key: "XTZ", value: 0, color: "#2c7df7" },
  ]);
  const [prices, setPrices] = useState(new Map());
  const [visibility, setVisibility] = useState(Array(11).fill("hidden"));
  const [message, setMessage] = useState("");
  const [currentUSD, setCurrentUSD] = useState(0);
  const [userValue, setUserValue] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      fetchUserValue(parsedUser.username);
      fetchPricesAndBalances(parsedUser.username);
    }
  }, [router]);

  const fetchUserValue = async (username) => {
    try {
      const response = await fetch(`${BASE_URL}/user/portfolio-value`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user value");
      }

      const data = await response.json();
      setUserValue(data.uservalue.toFixed(2));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    }
  };

  const fetchPricesAndBalances = async (username) => {
    const coins = [
      { coin: "bitcoin", logo: BTC_logo, key: "BTC" },
      { coin: "ethereum", logo: ETH_logo, key: "ETH" },
      { coin: "tether", logo: USDT_logo, key: "USDT" },
      { coin: "xrp", logo: XRP_logo, key: "XRP" },
      { coin: "bitcoinCash", logo: BCH_logo, key: "BCH" },
      { coin: "bitcoinSV", logo: BSV_logo, key: "BSV" },
      { coin: "litecoin", logo: LTC_logo, key: "LTC" },
      { coin: "binancecoin", logo: BNB_logo, key: "BNB" },
      { coin: "eos", logo: EOS_logo, key: "EOS" },
      { coin: "tezos", logo: XTZ_logo, key: "XTZ" },
    ];

    const pricesMap = new Map();

    try {
      // Fetch prices for all coins using Promise.all
      await Promise.all(
        coins.map(async ({ coin }) => {
          try {
            const response = await fetch(
              `${BASE_URL}/exchange/coin-price/${coin}`
            );
            const price = await response.json();
            pricesMap.set(coin, parseFloat(price).toFixed(2)); // Store price in pricesMap
          } catch (error) {
            console.error(`Error fetching price for ${coin}:`, error);
            pricesMap.set(coin, 0); // Set price to 0 in case of an error
          }
        })
      );

      console.log("Prices Map:", pricesMap); // Debugging prices

      // Fetch user balances
      const response = await fetch(`${BASE_URL}/user/balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch balances");
      }

      const data = await response.json();
      console.log("Balance Data:", data); // Debugging balances
      setCurrentUSD(data.balance.toFixed(2)); // Set USD balance in state

      // Map portfolio data with fetched prices and balances
      const updatedPortfolio = [
        {
          title: "USDollar",
          key: "$",
          value: data.balance,
          color: "#CBD4C6",
        },
        ...coins.map(({ coin, logo, key }) => {
          const balance = data[coin.toLowerCase()] || 0; // Get balance for the coin
          const price = pricesMap.get(coin) || 0; // Get price for the coin
          const value = balance * price; // Calculate total value
          console.log(
            `${coin} Balance: ${balance}, Price: ${typeof price}, Value: ${value}`
          );

          return {
            title: coin.charAt(0).toUpperCase() + coin.slice(1), // Capitalize coin name
            key: key.toUpperCase(),
            value: parseFloat(price),
            color: portfolio.find((item) => item.key === key)?.color || "#000",
          };
        }),
      ];

      console.log("Updated Portfolio:", updatedPortfolio); // Debugging portfolio
      setPortfolio(updatedPortfolio); // Update portfolio state
      setVisibility(Array(updatedPortfolio.length).fill("hidden"));
    } catch (error) {
      console.error("Error fetching prices and balances:", error);
      setMessage(error instanceof Error ? error.message : String(error));
    }
  };

  const handleRowClick = (Title: string) => {
    const title = Title.toLowerCase().replace(" ", "-");
    router.push(`/demo-trading/dashboard/${title}`);
  };

  return (
    <Container fluid className="bg-white text-black min-h-screen p-0">
      <div className="bg-[#ffffff] p-6 rounded-lg border border-gray-700 shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Hello 👋 {user.username}
        </h1>
        <h2 className="text-center text-[26px] text-gray-400 mb-2">
          Welcome to the TokenDisc
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Explore our demo trading platform for more information about trading,
          and connect with a vibrant community.
        </p>
        <h2 className="text-center text-dark text-3xl font-semibold mb-6">
          Available Coins
        </h2>
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100 text-xs uppercase text-gray-900">
              <tr>
                <th scope="col" className="py-4 px-6">
                  #
                </th>
                <th scope="col" className="py-4 px-6">
                  Coin
                </th>
                <th scope="col" className="py-4 px-6">
                  Symbol
                </th>
                <th scope="col" className="py-4 px-6">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-100">
              {[...portfolio.slice(1)].map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-200 transition duration-300 ease-in-out hover:cursor-pointer"
                  onClick={() => handleRowClick(item.title)}
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 flex items-center gap-4">
                    <Image
                      src={
                        {
                          BTC: BTC_logo,
                          ETH: ETH_logo,
                          USDT: USDT_logo,
                          XRP: XRP_logo,
                          BCH: BCH_logo,
                          BSV: BSV_logo,
                          LTC: LTC_logo,
                          BNB: BNB_logo,
                          EOS: EOS_logo,
                          XTZ: XTZ_logo,
                        }[item.key] || ""
                      }
                      alt={`${item.title} logo`}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <span className="font-medium text-black">{item.title}</span>
                  </td>
                  <td className="py-4 px-6">{item.key}</td>
                  <td className="py-4 px-6 text-black font-bold">
                    ${item.value.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={4}
                  className="py-4 px-6 text-center text-gray-900 italic bg-gray-100"
                >
                  more coins coming soon...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
