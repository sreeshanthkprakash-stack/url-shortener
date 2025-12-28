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
