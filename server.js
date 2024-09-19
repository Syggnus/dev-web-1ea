const express = require('express');
const app = express();
const db = require('./database');

app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(cors({
  origin: 'http://127.0.0.1:5500' 
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM produtos WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else {
      res.json({ mensagem: 'Produto removido com sucesso.' });
    }
  });
});

app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else if (!row) {
      res.status(404).json({ erro: 'Produto não encontrado.' });
    } else {
      res.json(row);
    }
  });
});

app.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, descricao, preco } = req.body;

  db.run(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
    [nome, descricao, preco, id],
    function(err) {
      if (err) {
        res.status(500).json({ erro: err.message });
      } else {
        res.json({ mensagem: 'Produto atualizado com sucesso.' });
      }
    }
  );
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
