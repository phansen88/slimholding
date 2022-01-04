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

async function getUsers() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM users ORDER BY id ASC');
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    conn.end();
  }
}

module.exports = {
  getUsers,
};
