# LKS SMK Tingkat Provinsi Jawa Barat Bidang Cloud Computing - Modul 1
1. Download or clone this repository into your EC2 Instance system
2. Make sure that `pm2` for process manager and `nodejs` (latest LTS version) application server are installed on your system
3. Create `pm2` startup for generate startup scripts and configure them in order to keep your process list intact across expected or unexpected machine restarts. For create the startup script, run the following command:
* `$ pm2 startup`
4. The command above will show the following output:
![alt text](./example-startup.png "Example")
5. Copy/paste the generated command as shown by the above picture, for example:
* `$ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u gitz --hp /home/gitz`
6. Install all nodejs dependencies with the following command:
* `$ npm install`
7. Rename or copy the `.env.example` to `.env`
8. Update the following environment variables:
* `APP_ENV` = `production`
* `APP_ID` = `your-participant-id`
* `APP_DEVOPS_NAME` = `Your Name`
* `AWS_REGION` = `us-east-1`
* `AWS_ELASTIC_CACHE_HOST` = `redis-cluster-host-address`
* `AWS_ELASTIC_CACHE_PORT` = `redis-cluster-port`
* `AWS_SECRET_MANAGER_ARN` = `secret-manager-arn`
* `AWS_RDS_DB` = `databasename`
9. Run the command below for build or run your application
	`$ npm run start`
10. Important commands for your deployment process:
* `$ npm run stop` for stop the application on current process
* `$ npm run ls` show `pm2` list processes
* `$ npm run log` show your application log for debugging process
