const db = require('./database');

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      preco REAL NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error('Erro ao criar tabela:', err.message);
      } else {
        console.log("Tabela 'produtos' criada com sucesso.");
      }
    }
  );
});

db.close();
