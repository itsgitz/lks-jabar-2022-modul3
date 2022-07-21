const AWS = require('aws-sdk');
const dataServiceParams = {
  resourceArn: process.env.AWS_RDS_ARN,
  secretArn: process.env.AWS_SECRET_MANAGER_ARN,
  database: process.env.AWS_RDS_DB
}

const response = require('./response');

const region = process.env.AWS_REGION;
const client = new AWS.RDSDataService({
  region: region
});

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

async function getUsers() {
  const query = `SELECT * FROM users`;

  const queryParams = setQueryParams(query);
  const result = await client.executeStatement(queryParams)
    .promise()
    .then((data, err) => {
    if (err) {
      throw err;
    } else {
      return data.records;
    }
  });

  const users = response.parseUsersData(result);

  return users;
}

async function getNotes() {
  const query = `SELECT * FROM notes`;

  const queryParams = setQueryParams(query);
  const result = await client.executeStatement(queryParams)
    .promise()
    .then((data, err) => {
    if (err) {
      throw err;
    } else {
      return data.records;
    }
  });

  const notes = response.parseUsersData(result);

  return notes;
}

async function initDB() { 
  getUsers().then(function(data) {
          console.log('test data from users table:', data)

  }).catch(function(err) {
          console.error(err)
  });

  getNotes().then(function(data) {
          console.log('test data from notes table', data)

  }).catch(function(err) {
          console.error(err)
  }); 
}

module.exports = {
  initDB
}
