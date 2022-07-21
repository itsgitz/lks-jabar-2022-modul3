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
	if (!transactionId) {
		return {
			resourceArn: dataServiceParams.resourceArn,
			secretArn: dataServiceParams.secretArn,
			database: dataServiceParams.database,
			sql: query,
			includeResultMetadata: true
		}
	} else {
		return {
			resourceArn: dataServiceParams.resourceArn,
			secretArn: dataServiceParams.secretArn,
			transactionId: transactionId,
			database: dataServiceParams.database,
			sql: query,
			includeResultMetadata: true
		}
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

async function getUserByUsername(username, password) {
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

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

  return user[0];
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

  const notes = response.parseNotesData(result);

  return notes;
}

async function insertUser(username, password) {
  const query = `INSERT INTO users (username, password)
    VALUES ('${username}', '${password}')
    RETURNING id
  `

  const queryParams = setQueryParams(query, null);
  console.log('query params', queryParams)

  const result = await client.executeStatement(queryParams)
    .promise()
    .then((data, err) => {
      if (err) {
        throw err;
      } else {
        return data.records[0][0].longValue;
      }
    });

  return result;

}

async function insertNotes(title, description, file) {
  const query = `INSERT INTO notes (title, notes, file)
    VALUES ('${title}', '${description}', '${file}')
    RETURNING id
  `

  const queryParams = setQueryParams(query, null);
  console.log('query params', queryParams)

  const result = await client.executeStatement(queryParams)
    .promise()
    .then((data, err) => {
      if (err) {
        throw err;
      } else {
        return data.records[0][0].longValue;
      }
    });

  return result;

}

module.exports = {
  getUsers, getUserByUsername, insertUser, getNotes, insertNotes
}
