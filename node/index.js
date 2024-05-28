const express = require('express');
const axios = require('axios').default;
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const Config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const connection = mysql.createConnection(Config)
const createTableQuery = `
CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
)
`;

const insertDataQuery = `INSERT INTO people (name) VALUES ('Eduardo')`;

connection.query(insertDataQuery, (err, result) => {
  if (err) throw err;
  console.log('Data inserted successfully');
});



app.get('/', (_req, res) => {
    const selectQuery = 'SELECT * FROM people';

    // Executar a consulta
    connection.query(selectQuery, (err, rows) => {
      if (err) throw err;
      
      // Construir a resposta
      let response = '<h1>Full Cycle Rocks</h1>';
      response += '<h2>People:</h2>';
      response += '<ul>';
      rows.forEach(row => {
        response += `<li>${row.name}</li>`;
      });
      response += '</ul>';
      
      // Enviar a resposta
      res.send(response);
    });
  });

app.listen(PORT, () => {
  console.log(`Application running on Port...: ${PORT} 🚀`);
});


