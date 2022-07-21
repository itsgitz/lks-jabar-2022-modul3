// parseUsersData for parsing or mapping RDS Data Service Response
// to JSON
// https://stackoverflow.com/a/57296495
function parseUsersData(getUsers) {
  const users = [];

  getUsers.forEach((item) => {
    users.push({
      id: item[0].longValue,
      username: item[1].stringValue,
      password: item[2].stringValue,
    });
  });

  return users;
}

function parseNotesData(getNotes) {
  const notes = [];

  getNotes.forEach((item) => {
    notes.push({
      id: item[0].longValue,
      title: item[1].stringValue,
      description: item[2].stringValue,
      file: item[3].stringValue
    });
  });

  return notes;
}

module.exports = {
  parseUsersData,
  parseNotesData
};

