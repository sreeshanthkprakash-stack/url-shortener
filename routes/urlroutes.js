const express = require("express");
const router = express.Router();
const { createShortUrl, redirectUrl, getRecentUrls } = require("../controllers/urlcontrollers");

router.post("/shorten", createShortUrl);
router.get("/recent", getRecentUrls);

// 🔥 THIS MUST BE LAST
router.get("/:code", redirectUrl);

module.exports = router;
