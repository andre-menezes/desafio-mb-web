const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/registration', (req, res) => {
  res.send('<html><body><h1>Formulário de Registro</h1></body></html>');
});

app.post('/registration', (req, res) => {
  const { body } = req;

  const commonFields = ['email', 'phone', 'client', 'password'];
  const pfFields = ['name', 'cpf', 'birthdate'];
  const pjFields = ['companyName', 'cnpj', 'openingDate'];

  const missingCommonFields = commonFields.filter(field => !body[field]);

  let missingSpecificFields = [];
  if (body.client === 'PF') {
    missingSpecificFields = pfFields.filter(field => !body[field]);
  } else if (body.client === 'PJ') {
    missingSpecificFields = pjFields.filter(field => !body[field]);
  }

  if (missingSpecificFields.length > 0 || missingCommonFields.length > 0) {
    return res.status(400).json({ message: 'Não foi possível realizar o cadastro!' });
  }

  try {
    return res.status(201).json({ message: 'Cadastro realizado com sucesso!'})
  } catch (error) {
    return res.status(400).json({ message: 'Não foi possível realizar o cadastro!' });
  }
});

module.exports = app;
