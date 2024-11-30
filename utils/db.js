const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: process.env.DB_PORT || 3306,
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Failed to connect to the MySQL server:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Check your MySQL username and password.');
    } else if (err.code === 'ENOTFOUND') {
      console.error('Database host not found. Verify DB_HOST in .env.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused. Ensure MySQL server is running.');
    }
  } else {
    console.log('Successfully connected to the MySQL server!');
    connection.release();
  }
});

module.exports = pool.promise(); 
