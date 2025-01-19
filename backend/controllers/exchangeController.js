const notDefined = (req, res) => {
  res.json({ error: "Endpoint not defined" });
};

const getApiLink = (coin) => {
  const coinMapping = {
    bitcoin: "https://api.coinlore.net/api/ticker/?id=90",
    dash: "https://api.coinlore.net/api/ticker/?id=8",
    monero: "https://api.coinlore.net/api/ticker/?id=28",
    ethereum: "https://api.coinlore.net/api/ticker/?id=80",
    xrp: "https://api.coinlore.net/api/ticker/?id=58",
    tether: "https://api.coinlore.net/api/ticker/?id=518",
    bitcoinCash: "https://api.coinlore.net/api/ticker/?id=2321",
    bitcoinSV: "https://api.coinlore.net/api/ticker/?id=33234",
    litecoin: "https://api.coinlore.net/api/ticker/?id=1",
    eos: "https://api.coinlore.net/api/ticker/?id=2679",
    binancecoin: "https://api.coinlore.net/api/ticker/?id=2710",
    tezos: "https://api.coinlore.net/api/ticker/?id=3682",
  };

  return coinMapping[coin] || null;
};

// Fetch current price as a string
const getCurrentPriceString = async (req, res) => {
  const coin = req.params.coin;
  const apiLink = getApiLink(coin);

  if (!apiLink) {
    return res.json({ error: "No valid coin given" });
  }

  try {
    const response = await fetch(apiLink);
    const data = await response.json();
    res.json(data[0].price_usd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch price" });
  }
};

// Fetch current price for internal usage
const getCurrentPrice = async (coin) => {
  const apiLink = getApiLink(coin);

  if (!apiLink) {
    throw new Error("Invalid coin");
  }

  const response = await fetch(apiLink);
  return response.json();
};

// Fetch full information about a coin
const getInformationString = async (req, res) => {
  const coin = req.params.coin;
  const apiLink = getApiLink(coin);

  if (!apiLink) {
    return res.json({ error: "No valid coin given" });
  }

  try {
    const response = await fetch(apiLink);
    const data = await response.json();
    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch coin information" });
  }
};

const exchange = {
  notDefined,
  getCurrentPriceString,
  getCurrentPrice,
  getInformationString,
};

module.exports = exchange;
