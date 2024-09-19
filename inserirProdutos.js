const db = require('./database');

const produtos = [
  ['Snack Saudável', 'Snack feito com frutas desidratadas', 15.90],
  ['Refeição Congelada Fitness', 'Refeição balanceada, rica em proteínas', 25.99],
  ['Suco Natural Detox', 'Suco natural à base de frutas e vegetais', 8.75]
];

db.serialize(() => {
  const stmt = db.prepare('INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)');

  produtos.forEach((produto) => {
    stmt.run(produto, (err) => {
      if (err) {
        console.error('Erro ao inserir produto:', err.message);
      } else {
        console.log(`Produto '${produto[0]}' inserido com sucesso.`);
      }
    });
  });

  stmt.finalize();
});

db.close();
