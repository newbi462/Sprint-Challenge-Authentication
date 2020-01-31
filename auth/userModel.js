const db = require('../database/dbConfig.js');

module.exports = {
  findUserById,
  addUser,
}

function findUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function addUser(userObj) {
  return db("users")
    .insert(userObj, "id")
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}
