const Url = require("../models/url");
const shortid = require("shortid");
const QRCode = require("qrcode");

exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || !originalUrl.startsWith("http")) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const shortCode = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    const qrImage = await QRCode.toDataURL(shortUrl);

    const newUrl = new Url({ originalUrl, shortCode, qrCode: qrImage, clicks: 0 });
    await newUrl.save();

    res.json({ shortUrl, qrCode: qrImage });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecentUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ _id: -1 }).limit(5);
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const code = req.params.code;

    const url = await Url.findOne({ shortCode: code });
    if (!url) return res.status(404).send("Link not found");

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
