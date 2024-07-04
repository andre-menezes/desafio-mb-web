const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
  credentials: true
}));

app.get('/registration', (req, res) => {
  res.send('<html><body><h1>Formulário de Registro</h1></body></html>');
});

app.post('/registration', (req, res) => {
  const { body } = req;
  console.log('Dados recebidos:', body);
  res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
});

module.exports = app;
