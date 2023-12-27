const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    nome: String,
    endereco: String,
    dataNascimento: Date,
    email: { type: String, unique: true },
    sexo: String,
    genero: String
    // outros campos conforme necessário
  });
  
  module.exports = mongoose.model('usuarios', userSchema);