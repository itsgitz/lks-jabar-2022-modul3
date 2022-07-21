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

async function getUserByUsername(username) {
  const query = `SELECT * FROM users WHERE username = ${username}`;

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

  const user = response.parseUsersData(result);

  return user;
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

async function insertUser(username, password) {
  const begin = client.beginTransaction(dataServiceParams)
  const query = `INSERT INTO notes (username, password)
    VALUES ('${username}', '${password}')
    RETURNING id
  `

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

  const commitTransaction = await client.commitTransaction({
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
    status: commitTransaction.transactionStatus
  };
}

async function insertNotes(title, description) {
  const begin = client.beginTransaction(dataServiceParams)
  const query = `INSERT INTO notes (title, description)
    VALUES ('${title}', '${description}')
    RETURNING id
  `

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

  const commitTransaction = await client.commitTransaction({
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
    status: commitTransaction.transactionStatus
  };
}

module.exports = {
  getUsers, getUserByUsername, insertUser, getNotes, insertNotes
}
