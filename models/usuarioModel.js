const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  endereco: String,
  dataNascimento: Date,
  sexo: String,
  genero: String,
  tipoUsuario: { type: String, enum: ['fisica', 'juridica'], required: true }, // Campo obrigatório
  cpf: { type: String, unique: true, sparse: true, required: function() { return this.tipoUsuario === 'fisica'; } }, // Obrigatório para pessoa física
  cnpj: { type: String, unique: true, sparse: true, required: function() { return this.tipoUsuario === 'juridica'; } }, // Obrigatório para pessoa jurídica
  telefone: String,
  fotoPerfil: String,
  role: { type: String, default: 'usuario' },
  statusConta: { type: String, default: 'ativa' },
  dataCriacao: { type: Date, default: Date.now },
  ultimoLogin: Date,
  preferencias: {
    idioma: String,
    tema: String,
  },
  tokenSeguranca: String,
  enderecoIP: String,
  biografia: String,
  redesSociais: {
    facebook: String,
    twitter: String,
    instagram: String,
  },
  nacionalidade: String,
  preferenciasNotificacao: {
    email: Boolean,
    sms: Boolean,
  },
  dataAtualizacaoPerfil: { type: Date, default: Date.now },
});

module.exports = mongoose.model('usuarios', userSchema);
