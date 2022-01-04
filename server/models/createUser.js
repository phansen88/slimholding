// Ensure environment variables are read.
require('dotenv').config();
const { json } = require('body-parser');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
});

async function createUser(data) {
  let conn;
  try {
    conn = await pool.getConnection();
    // INSERT INTO 'db1'.'users' ('first_name', 'last_name', 'active', 'user_name', 'title', 'role', 'email') VALUES ('John', 'Wayne', '0', 'cowbow', 'Developer', 'Fastests Man', 'john@example.com');
    // SELECT LAST_INSERT_ID();
    // INSERT INTO person (first_name, last_name) VALUES ('John', 'Doe');

    const res = await conn.query(
      'INSERT INTO users (first_name, last_name, active, user_name, title, role, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        'John',
        'Wayne',
        '0',
        'cowbow',
        'Developer',
        'Fastests Man',
        'john@example.com',
      ]
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    conn.end();
  }
}

module.exports = {
  createUser,
};
