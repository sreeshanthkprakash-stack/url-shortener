const express = require("express");
const router = express.Router();
const { createShortUrl, redirectUrl } = require("../controllers/urlcontrollers");

router.post("/shorten", createShortUrl);
router.get("/:code", redirectUrl);

module.exports = router;
