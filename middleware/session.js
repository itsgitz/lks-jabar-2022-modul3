const session = require('express-session');
const Redis = require('ioredis');
const connector = require('connect-redis');
const RedisStore = connector(session);

const redisClient = new Redis.Cluster([{
  port: process.env.AWS_ELASTIC_CACHE_PORT,
  host: process.env.AWS_ELASTIC_CACHE_HOST,
}]);

const applicationSession = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.APP_KEY,
  cookie: {},
  resave: false,
  saveUninitialized: false
}

module.exports = session(applicationSession);
