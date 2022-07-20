const showVariables = function() {
  const environmentVariables = {
    app_env: process.env.APP_ENV,
    app_id: process.env.APP_ID,
    app_devops_name: process.env.APP_DEVOPS_NAME,
    app_name: process.env.APP_NAME,
    app_key: process.env.APP_KEY,
    app_redis_host: process.env.APP_REDIS_HOST,
    app_redis_port: process.env.APP_REDIS_PORT
  }

  console.log(environmentVariables);
} 

module.exports = showVariables;
