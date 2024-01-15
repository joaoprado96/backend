const mongoose = require('mongoose');

const faleconoscoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    sugestao: String
});

module.exports = mongoose.model('faleconosco', faleconoscoSchema);
