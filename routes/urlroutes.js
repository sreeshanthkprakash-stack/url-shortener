const express = require("express");
const router = express.Router();
const { createShortUrl, redirectUrl } = require("../controllers/urlcontrollers");
const { getRecentUrls } = require("../controllers/urlcontrollers");

router.post("/shorten", createShortUrl);
router.get("/:code", redirectUrl);
router.get("/recent", getRecentUrls);


module.exports = router;


