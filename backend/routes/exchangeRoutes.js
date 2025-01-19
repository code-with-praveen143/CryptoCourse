const express = require("express");
const exchange = require("../controllers/exchangeController");
const router = express.Router();

router.get("/coin-price/:coin", exchange.getCurrentPriceString);
router.get("/coin-info/:coin", exchange.getInformationString);
router.all("*", exchange.notDefined);

module.exports = router;
