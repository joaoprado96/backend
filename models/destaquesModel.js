const mongoose = require('mongoose');

const destaquesSchema = new mongoose.Schema({
    lugarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lugar'
    },
    manchete: String,
    link: String,
    fotos: [{
        data: Buffer,
        contentType: String
    }]
});

module.exports = mongoose.model('destaques', destaquesSchema);
