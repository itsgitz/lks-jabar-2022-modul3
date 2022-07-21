# LKS SMK Tingkat Provinsi Jawa Barat Bidang Cloud Computing - Modul 1
1. Download or clone this repository into your EC2 Instance system
2. Make sure that `pm2` for process manager and `nodejs` (latest LTS version) application server are installed on your system
3. Install all nodejs dependencies with the following command:
	 `$ npm install`
4. Rename or copy the `.env.example` to `.env`
5. Update the following environment variables:
* `APP_ENV` = `production`
* `APP_ID` = `your-participant-id`
* `APP_DEVOPS_NAME` = `Your Name`
* `AWS_REGION` = `your-selected-region`
* `AWS_ELASTIC_CACHE_HOST` = `redis-cluster-host-address`
* `AWS_ELASTIC_CACHE_PORT` = `redis-cluster-port`
* `AWS_SECRET_MANAGER_ARN` = `secret-manager-arn`
* `AWS_RDS_ARN` = `rds-arn`
* `AWS_RDS_DB` = `databasename`
6. Run the command below for build or run your application
	`$ npm run start`
7. Important commands for your deployment process:
* `$ npm run stop` for stop the application on current process
* `$ npm run ls` show `pm2` list processes
* `$ npm run log` show your application log for debugging process
