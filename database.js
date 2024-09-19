const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('saborela_2024.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados estabelecida.');
  }
});

module.exports = db;
