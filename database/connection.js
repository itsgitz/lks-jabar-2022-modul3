const AWS = require('aws-sdk');
const dataServiceParams = {
  resourceArn: process.env.APP_RDS_ARN,
  secretArn: process.env.APP_SECRET_ARN,
  database: process.env.APP_RDS_DB
}

const setQueryParams = function (query, transactionId = null) {
  return {
    resourceArn: dataServiceParams.resourceArn,
    secretArn: dataServiceParams.secretArn,
    transactionId: transactionId,
    database: dataServiceParams.database,
    sql: query,
    includeResultMetadata: true
  }
}
