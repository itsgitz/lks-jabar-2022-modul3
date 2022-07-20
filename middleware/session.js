const session = require('express-session');
const redis = require('redis');
const connector = require('connect-redis');
const RedisStore = connector(session);

const redisConnectionUrl = `redis://${process.env.APP_REDIS_HOST}:${process.env.APP_REDIS_PORT}`;
const redisClient = redis.createClient({
  url: redisConnectionUrl,
  legacyMode: true
});

redisClient.connect().catch(console.error);

redisClient.on('error', function (err) {
  console.error(`Could not establish a connection with redis ${err}`);
});

redisClient.on('connect', function (err) {
  console.log('Connected to redis :)');
});

const applicationSession = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.APP_KEY,
  cookie: {},
  resave: false,
  saveUninitialized: false
}

module.exports = session(applicationSession);
