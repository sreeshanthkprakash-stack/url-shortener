const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", err => console.log("Redis Error:", err));

redisClient.connect()
  .then(() => console.log("Redis Connected"));

module.exports = redisClient;
