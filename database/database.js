const { Client } = require('pg');

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "1234",
  database: "postgres"
});

client.connect();

client.query(`SELECT id, username, password_hash, salt FROM users`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }

  client.end();
});
