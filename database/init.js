const AWS = require('aws-sdk');
const dataServiceParams = {
  resourceArn: process.env.AWS_RDS_ARN,
  secretArn: process.env.AWS_SECRET_MANAGER_ARN,
  database: process.env.AWS_RDS_DB
}

const region = process.env.AWS_REGION;

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

async function createUserTable() {
  const client = new AWS.RDSDataService({
    region: region
  })

  const begin = await client.beginTransaction(dataServiceParams).promise();
  const query = `CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
  )`;

  const queryParams = setQueryParams(query, begin.transactionId);

  const result = await client.executeStatement(queryParams)
    .promise()
    .then((data, err) => {
      if (err) {
        throw err;
      } else {
        return data.records[0][0].longValue;
      }
    });

  const commit = await client.commitTransaction({
    resourceArn: dataServiceParams.resourceArn,
    secretArn: dataServiceParams.secretArn,
    transactionId: begin.transactionId
  })
    .promise()
    .then((data, err) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    });

  return {
    id: result,
    status: commit.transactionStatus
  }
}

async function createNotesTable() {
  const client = new AWS.RDSDataService({
    region: region
  })

  const begin = await client.beginTransaction(dataServiceParams).promise();
  const query = `CREATE TABLE IF NOT EXISTS notes (
    id serial PRIMARY KEY,
    title VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
  )`;

  const queryParams = setQueryParams(query, begin.transactionId);

  const result = await client.executeStatement(queryParams)
    .promise()
    .then((data, err) => {
      if (err) {
        throw err;
      } else {
        return data.records[0][0].longValue;
      }
    });

  const commit = await client.commitTransaction({
    resourceArn: dataServiceParams.resourceArn,
    secretArn: dataServiceParams.secretArn,
    transactionId: begin.transactionId
  })
    .promise()
    .then((data, err) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    });

  return {
    id: result,
    status: commit.transactionStatus
  }
}

async function initDB() {
  createUserTable().then(function() {
    console.log('Create users table ...')
  }).catch(function(err) {
    console.error(err);
  });

  createNotesTable().then(function() {
    console.log('Create notes table ...')
  }).catch(function(err) {
    console.error(err);
  })
}

module.exports = {
  initDB
}
