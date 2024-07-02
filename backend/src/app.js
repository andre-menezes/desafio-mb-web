const express = require('express');
const app = express();

app.use(express.json());

// Endpoint GET para renderizar a página HTML
app.get('/registration', (req, res) => {
  res.send('<html><body><h1>Formulário de Registro</h1></body></html>');
});

// Endpoint POST para receber os dados do formulário
app.post('/registration', (req, res) => {
  const { body } = req;
  console.log('Dados recebidos:', body);
  res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
});

module.exports = app;
