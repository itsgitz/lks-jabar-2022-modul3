const showVariables = function() {
  const environmentVariables = {
    app_env: process.env.APP_ENV,
    app_id: process.env.APP_ID,
    app_devops_name: process.env.APP_DEVOPS_NAME,
    app_name: process.env.APP_NAME,
    app_key: process.env.APP_KEY,
    aws_region: process.env.AWS_REGION,
    aws_elastic_cache_host: process.env.AWS_ELASTIC_CACHE_HOST,
    aws_elastic_cache_port: process.env.AWS_ELASTIC_CACHE_PORT,
    aws_rds_arn: process.env.AWS_RDS_ARN,
    aws_rds_db: process.env.AWS_RDS_DB,
    aws_secret_manager: process.env.AWS_SECRET_MANAGER_ARN
  }

  console.log(environmentVariables);
} 

module.exports = showVariables;
