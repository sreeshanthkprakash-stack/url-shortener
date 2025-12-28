const Url = require("../models/url");   // 🔥 FIXED case-sensitive path
const shortid = require("shortid");
const QRCode = require("qrcode");

exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || !originalUrl.startsWith("http")) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const shortCode = shortid.generate();

    // 🔥 Works both locally and in production
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    const qrImage = await QRCode.toDataURL(shortUrl);

    const newUrl = new Url({
      originalUrl,
      shortCode,
      qrCode: qrImage
    });

    await newUrl.save();

    res.json({ shortUrl, qrCode: qrImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) return res.status(404).send("Link not found");

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
